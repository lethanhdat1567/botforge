"use client";

import ChatSearching from "@/app/admin/support/chat/components/ChatSidebar/ChatSearching";
import ChatSidebarItem from "@/app/admin/support/chat/components/ChatSidebar/ChatSidebarItem";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChatSocket } from "@/hooks/use-chat-socket";
import { AdminConversationItem, chatService } from "@/services/livechatService";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function ChatSidebar() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const userId = searchParams.get("userId");
    const [chats, setChats] = useState<AdminConversationItem[]>([]);

    const handleSelect = async (userId: string) => {
        await chatService.markRead({ userId });
        router.push(`/admin/support/chat?userId=${userId}`);
        fetchChats();
    };

    const fetchChats = async (searchValue?: string) => {
        try {
            const res = await chatService.listConversations({ q: searchValue });
            setChats(res.data.items);
        } catch (error) {
            console.log(error);
        }
    };

    function handleSearching(value: string) {
        fetchChats(value);
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchChats();
    }, []);

    useChatSocket("admin:sidebar", "admin", async () => {
        if (userId) {
            await chatService.markRead({ userId });
            await fetchChats();
        } else {
            fetchChats();
        }
    });

    return (
        <div className="flex h-full w-90 shrink-0 flex-col overflow-hidden">
            <ChatSearching onSearching={handleSearching} />

            <ScrollArea className="h-full overflow-y-auto">
                <div className="space-y-1 px-2">
                    {chats.map((c, i) => (
                        <ChatSidebarItem
                            key={c.id}
                            active={userId === c.userId}
                            displayName={c.displayName}
                            lastMessage={c.lastMessage}
                            lastMessageAt={c.lastMessageAt}
                            unreadCount={c.unreadCount}
                            userId={c.userId}
                            onClick={handleSelect}
                        />
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
}

export default ChatSidebar;
