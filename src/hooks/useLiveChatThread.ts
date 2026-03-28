"use client";

import { DEFAULT_SUPPORT_CONTACT } from "@/lib/support-chat-contact";
import { liveChatApi } from "@/services/liveChatApi";
import { connectAnonymousChatSocket, connectChatSocket } from "@/socket/socket";
import { SocketEvent } from "@/socket/socket.events";
import { useAuthStore } from "@/store/authStore";
import type {
    ChatThreadContact,
    LiveChatSocketMessagePayload,
    MessageDto,
} from "@/types/live-chat";
import { useCallback, useEffect, useRef, useState } from "react";

type UseLiveChatThreadOptions = {
    /** Mở websocket + tải tin khi true (ví dụ popover dialog đang mở). */
    enabled?: boolean;
};

function socketPayloadToMessage(
    payload: LiveChatSocketMessagePayload,
): MessageDto {
    const created =
        typeof payload.createdAt === "string"
            ? payload.createdAt
            : new Date(payload.createdAt).toISOString();
    const isImage = payload.type === "image";
    return {
        id: payload.id,
        conversationId: payload.conversationId,
        role: payload.sender,
        content: isImage ? null : payload.content,
        fileUrl: isImage ? payload.content : null,
        createdAt: created,
        revokedAt: null,
        readByAdmin: payload.sender === "admin",
        readByUser: payload.sender === "user",
    };
}

export function useLiveChatThread(options: UseLiveChatThreadOptions = {}) {
    const { enabled = true } = options;
    const user = useAuthStore((s) => s.user);

    const [conversationId, setConversationId] = useState<string | null>(null);
    const [messages, setMessages] = useState<MessageDto[]>([]);
    const [loading, setLoading] = useState(false);
    const [sending, setSending] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const conversationIdRef = useRef<string | null>(null);
    conversationIdRef.current = conversationId;

    const loadMessages = useCallback(async (cid: string) => {
        const list = await liveChatApi.fetchMessages(cid, { limit: 100 });
        setMessages(list);
    }, []);

    const bootstrap = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const conv = await liveChatApi.ensureOpenConversation();
            setConversationId(conv.id);
            await loadMessages(conv.id);
            await liveChatApi.markConversationRead(conv.id).catch(() => {});
        } catch (e) {
            setError(
                e instanceof Error ? e.message : "Không thể kết nối hỗ trợ trực tiếp.",
            );
        } finally {
            setLoading(false);
        }
    }, [loadMessages]);

    useEffect(() => {
        if (!enabled) {
            return;
        }
        void bootstrap();
    }, [enabled, bootstrap]);

    useEffect(() => {
        if (!enabled || !conversationId) {
            return;
        }

        const socket = user
            ? connectChatSocket({
                  userId: user.id,
                  role: user.role === "admin" ? "admin" : "user",
                  conversationId,
              })
            : connectAnonymousChatSocket(conversationId);

        const onIncoming = (payload: LiveChatSocketMessagePayload) => {
            if (payload.conversationId !== conversationIdRef.current) {
                return;
            }
            setMessages((prev) => {
                if (prev.some((m) => m.id === payload.id)) {
                    return prev;
                }
                const incoming = socketPayloadToMessage(payload);
                return [...prev, incoming].sort(
                    (a, b) =>
                        new Date(a.createdAt).getTime() -
                        new Date(b.createdAt).getTime(),
                );
            });
        };

        socket.on(SocketEvent.CHAT_NEW_MESSAGE, onIncoming);

        return () => {
            socket.off(SocketEvent.CHAT_NEW_MESSAGE, onIncoming);
            socket.disconnect();
        };
    }, [enabled, conversationId, user?.id, user?.role]);

    const sendMessage = useCallback(
        async (text: string) => {
            const trimmed = text.trim();
            const cid = conversationIdRef.current;
            if (!trimmed || !cid) {
                return;
            }
            setSending(true);
            setError(null);
            try {
                const created = await liveChatApi.sendTextMessage(cid, trimmed);
                setMessages((prev) =>
                    prev.some((m) => m.id === created.id)
                        ? prev
                        : [...prev, created].sort(
                              (a, b) =>
                                  new Date(a.createdAt).getTime() -
                                  new Date(b.createdAt).getTime(),
                          ),
                );
            } catch (e) {
                setError(
                    e instanceof Error ? e.message : "Gửi tin nhắn thất bại.",
                );
            } finally {
                setSending(false);
            }
        },
        [],
    );

    const contact: ChatThreadContact = DEFAULT_SUPPORT_CONTACT;

    return {
        contact,
        conversationId,
        messages,
        loading,
        sending,
        error,
        viewer: "customer" as const,
        sendMessage,
        refresh: bootstrap,
    };
}
