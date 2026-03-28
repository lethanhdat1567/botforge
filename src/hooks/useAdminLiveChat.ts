"use client";

import { DEFAULT_SUPPORT_CONTACT } from "@/lib/support-chat-contact";
import { liveChatApi } from "@/services/liveChatApi";
import { connectChatSocket } from "@/socket/socket";
import { SocketEvent } from "@/socket/socket.events";
import { useAuthStore } from "@/store/authStore";
import type {
    AdminConversationListRow,
    ChatThreadContact,
    LiveChatSidebarItem,
    LiveChatSocketMessagePayload,
    MessageDto,
} from "@/types/live-chat";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

function previewFromLastMessage(
    last: AdminConversationListRow["lastMessage"],
): string {
    if (!last) {
        return "Chưa có tin nhắn";
    }
    if (last.fileUrl) {
        return "Đã gửi ảnh";
    }
    const t = last.content?.trim();
    return t || "Tin nhắn";
}

function mapRowToSidebarItem(row: AdminConversationListRow): LiveChatSidebarItem {
    const name =
        row.user?.displayName?.trim() ||
        row.anonymousParticipant?.displayName?.trim() ||
        row.guestName?.trim() ||
        (row.anonymousParticipantId ? "Khách (ẩn danh)" : "Người dùng");

    const avatar =
        row.user?.avatar?.trim() ||
        `https://i.pravatar.cc/128?u=${encodeURIComponent(row.id)}`;

    const last = row.lastMessage;
    const timeRef = last?.createdAt ?? row.updatedAt;

    return {
        id: row.id,
        conversationId: row.id,
        name,
        time: formatDistanceToNow(new Date(timeRef), {
            addSuffix: true,
            locale: vi,
        }),
        preview: previewFromLastMessage(last),
        unread: row.adminUnreadCount,
        avatar,
        lastMessageRole: last?.role ?? null,
    };
}

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

export function useAdminLiveChat() {
    const admin = useAuthStore((s) => s.user);
    const adminId = admin?.id;
    const isAdmin = admin?.role === "admin";

    const [rows, setRows] = useState<AdminConversationListRow[]>([]);
    const [listLoading, setListLoading] = useState(true);
    const [listError, setListError] = useState<string | null>(null);

    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [messages, setMessages] = useState<MessageDto[]>([]);
    const [messagesLoading, setMessagesLoading] = useState(false);

    const [sending, setSending] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const selectedIdRef = useRef<string | null>(null);
    selectedIdRef.current = selectedId;

    const loadList = useCallback(
        async (opts?: { silent?: boolean }) => {
            if (!isAdmin) {
                return;
            }
            if (!opts?.silent) {
                setListLoading(true);
            }
            setListError(null);
            try {
                const data = await liveChatApi.listAdminConversations();
                setRows(data);
                if (!opts?.silent) {
                    setSelectedId((prev) => {
                        if (prev && data.some((r) => r.id === prev)) {
                            return data.find((r) => r.id === prev)?.id ?? prev;
                        }
                        return data[0]?.id ?? null;
                    });
                }
            } catch (e) {
                setListError(
                    e instanceof Error ? e.message : "Không tải được danh sách chat.",
                );
            } finally {
                if (!opts?.silent) {
                    setListLoading(false);
                }
            }
        },
        [isAdmin],
    );

    useEffect(() => {
        void loadList({ silent: false });
    }, [loadList]);

    const loadMessages = useCallback(
        async (cid: string, opts?: { silent?: boolean }) => {
            if (!opts?.silent) {
                setMessagesLoading(true);
            }
            try {
                const list = await liveChatApi.fetchMessages(cid, { limit: 100 });
                setMessages(list);
            } finally {
                if (!opts?.silent) {
                    setMessagesLoading(false);
                }
            }
        },
        [],
    );

    useEffect(() => {
        if (!selectedId) {
            setMessages([]);
            return;
        }
        void loadMessages(selectedId, { silent: false });
        void liveChatApi
            .markConversationRead(selectedId)
            .then(() => loadList({ silent: true }))
            .catch(() => {});
    }, [selectedId, loadMessages, loadList]);

    useEffect(() => {
        if (!isAdmin || !adminId) {
            return;
        }

        const socket = connectChatSocket({
            userId: adminId,
            role: "admin",
            conversationId: selectedId ?? undefined,
        });

        const onSidebar = () => {
            void loadList({ silent: true });
        };

        const onMsg = (payload: LiveChatSocketMessagePayload) => {
            const cid = payload.conversationId;
            const isActive = cid === selectedIdRef.current;

            if (isActive) {
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
            }

            const refreshList = () => {
                void loadList({ silent: true });
            };

            // Đang mở đúng thread + khách nhắn → coi như đã đọc (giống đang chat trực tiếp).
            if (isActive && payload.sender === "user") {
                void liveChatApi
                    .markConversationRead(cid)
                    .then(refreshList)
                    .catch(refreshList);
            } else {
                refreshList();
            }
        };

        socket.on(SocketEvent.ADMIN_SIDEBAR_NEW_CHAT, onSidebar);
        socket.on(SocketEvent.CHAT_NEW_MESSAGE, onMsg);

        return () => {
            socket.off(SocketEvent.ADMIN_SIDEBAR_NEW_CHAT, onSidebar);
            socket.off(SocketEvent.CHAT_NEW_MESSAGE, onMsg);
            socket.disconnect();
        };
    }, [isAdmin, adminId, selectedId, loadList]);

    const sidebarItems = useMemo(() => rows.map(mapRowToSidebarItem), [rows]);

    const selectedRow = useMemo(
        () => rows.find((r) => r.id === selectedId) ?? null,
        [rows, selectedId],
    );

    const contact: ChatThreadContact = selectedRow
        ? {
              id: selectedRow.id,
              name:
                  selectedRow.user?.displayName?.trim() ||
                  selectedRow.anonymousParticipant?.displayName?.trim() ||
                  selectedRow.guestName?.trim() ||
                  (selectedRow.anonymousParticipantId
                      ? "Khách (ẩn danh)"
                      : "Người dùng"),
              avatar:
                  selectedRow.user?.avatar?.trim() ||
                  `https://i.pravatar.cc/128?u=${encodeURIComponent(selectedRow.id)}`,
          }
        : DEFAULT_SUPPORT_CONTACT;

    const sendMessage = useCallback(
        async (text: string) => {
            const trimmed = text.trim();
            const cid = selectedIdRef.current;
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
                void loadList({ silent: true });
            } catch (e) {
                setError(
                    e instanceof Error ? e.message : "Gửi tin nhắn thất bại.",
                );
            } finally {
                setSending(false);
            }
        },
        [loadList],
    );

    return {
        sidebarItems,
        selectedConversationId: selectedId,
        selectConversation: setSelectedId,
        contact,
        messages,
        listLoading,
        messagesLoading,
        listError,
        sending,
        error,
        viewer: "admin" as const,
        sendMessage,
        refreshList: () => loadList({ silent: false }),
        isAdmin,
    };
}
