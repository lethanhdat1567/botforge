"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { LiveChatSidebarItem } from "@/types/live-chat";
import { Plus, Search } from "lucide-react";

import { ChatSidebarRow } from "./components/ChatSidebarRow";

type ChatSidebarProps = {
    chats: LiveChatSidebarItem[];
    selectedConversationId: string | null;
    onSelectConversation: (conversationId: string) => void;
    loading?: boolean;
};

export function ChatSidebar({
    chats,
    selectedConversationId,
    onSelectConversation,
    loading,
}: ChatSidebarProps) {
    return (
        <aside className="bg-card flex h-full min-h-0 w-100 min-w-0 shrink-0 flex-col overflow-hidden border-r">
            <div className="flex shrink-0 items-center justify-between gap-2 px-4 py-3">
                <h1 className="text-foreground truncate text-lg font-semibold tracking-tight">
                    Chats
                </h1>
                <Button
                    variant="outline"
                    size="icon-sm"
                    className="shrink-0 rounded-full"
                    type="button"
                    aria-label="New chat"
                    disabled
                >
                    <Plus className="size-4" />
                </Button>
            </div>
            <div className="shrink-0 px-3 pb-2">
                <div className="relative min-w-0">
                    <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                    <Input
                        type="search"
                        placeholder="Chats search…"
                        className="bg-muted/40 w-full min-w-0 rounded-full border-0 pr-3 pl-9 shadow-none"
                        readOnly
                    />
                </div>
            </div>
            <div className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-y-contain">
                {loading ? (
                    <p className="text-muted-foreground p-4 text-sm">
                        Đang tải…
                    </p>
                ) : chats.length === 0 ? (
                    <p className="text-muted-foreground p-4 text-sm">
                        Chưa có cuộc trò chuyện nào.
                    </p>
                ) : (
                    <ul className="space-y-0.5 p-2">
                        {chats.map((c) => (
                            <ChatSidebarRow
                                key={c.id}
                                item={c}
                                isActive={c.conversationId === selectedConversationId}
                                onSelect={() => onSelectConversation(c.conversationId)}
                            />
                        ))}
                    </ul>
                )}
            </div>
        </aside>
    );
}
