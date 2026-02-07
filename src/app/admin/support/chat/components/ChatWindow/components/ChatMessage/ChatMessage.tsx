"use client";

import Actions from "@/app/admin/support/chat/components/ChatWindow/components/ChatMessage/Actions";
import ChatMessageImage from "@/app/admin/support/chat/components/ChatWindow/components/ChatMessage/ChatMessageImage";
import ChatMessageVideo from "@/app/admin/support/chat/components/ChatWindow/components/ChatMessage/ChatMessageVideo";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChatSocket } from "@/hooks/use-chat-socket";
import { cn } from "@/lib/utils";
import { ChatMessage, chatService } from "@/services/livechatService";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useRef, useState } from "react";

function ChatMessages({ userId }: { userId?: string }) {
    const [chatItems, setChatItems] = useState<ChatMessage[]>([]);
    const bottomRef = useRef<HTMLDivElement | null>(null);

    const user = useAuthStore((state) => state.user);
    const targetUserId = userId || user.id;
    const isAdminPage = Boolean(userId);

    const fetchConversation = async () => {
        try {
            const res = await chatService.listMessages(
                userId ? { userId } : undefined,
            );
            setChatItems(res.data.items);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchConversation();
    }, [userId]);

    useChatSocket(targetUserId, () => {
        fetchConversation();
    });

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatItems]);

    async function handleDestroy(id: string) {
        try {
            await chatService.revokeMessage(id);
            fetchConversation();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ScrollArea className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
                {chatItems.map((m) => {
                    const isMine = isAdminPage
                        ? m.sender === "admin"
                        : m.sender === "user";

                    const isRevoked = Boolean(m.revokedAt);

                    return (
                        <div
                            key={m.id}
                            className={cn(
                                "flex items-end gap-3",
                                isMine ? "justify-end" : "justify-start",
                            )}
                        >
                            {isAdminPage && isMine && !isRevoked && (
                                <Actions
                                    onDestroy={() => handleDestroy(m.id)}
                                />
                            )}

                            <div
                                className={cn(
                                    "max-w-[60%] rounded-xl px-4 py-2 text-sm",
                                    isRevoked
                                        ? "bg-muted text-muted-foreground italic"
                                        : isMine
                                          ? "bg-primary text-primary-foreground"
                                          : "bg-muted",
                                )}
                            >
                                {isRevoked ? (
                                    <p>Tin nhắn đã được thu hồi</p>
                                ) : (
                                    <>
                                        {m.type === "text" && (
                                            <p>{m.content}</p>
                                        )}
                                        {m.type === "image" && (
                                            <ChatMessageImage src={m.content} />
                                        )}
                                        {m.type === "video" && (
                                            <ChatMessageVideo src={m.content} />
                                        )}
                                    </>
                                )}

                                <p className="mt-1 text-right text-xs opacity-60">
                                    {m.createdAt}
                                </p>
                            </div>
                        </div>
                    );
                })}

                <div ref={bottomRef} />
            </div>
        </ScrollArea>
    );
}

export default ChatMessages;
