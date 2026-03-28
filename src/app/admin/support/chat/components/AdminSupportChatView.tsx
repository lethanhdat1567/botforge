"use client";

import { useAdminLiveChat } from "@/hooks/useAdminLiveChat";

import { ChatSidebar } from "./ChatSidebar/ChatSidebar";
import { ChatThread } from "./ChatThread/ChatThread";

export function AdminSupportChatView() {
    const {
        sidebarItems,
        selectedConversationId,
        selectConversation,
        contact,
        messages,
        listLoading,
        messagesLoading,
        listError,
        sending,
        error,
        sendMessage,
        isAdmin,
    } = useAdminLiveChat();

    if (!isAdmin) {
        return (
            <div className="bg-background text-muted-foreground flex h-full min-h-0 flex-1 items-center justify-center p-6 text-sm">
                Chỉ quản trị viên mới xem được trang này.
            </div>
        );
    }

    if (listError) {
        return (
            <div className="bg-background text-destructive flex h-full min-h-0 flex-1 items-center justify-center p-6 text-sm">
                {listError}
            </div>
        );
    }

    return (
        <div
            className="bg-background -m-4 flex h-full min-h-0 min-w-0 flex-1 overflow-hidden"
            data-slot="admin-support-chat"
        >
            <ChatSidebar
                chats={sidebarItems}
                selectedConversationId={selectedConversationId}
                onSelectConversation={selectConversation}
                loading={listLoading}
            />
            {selectedConversationId ? (
                <ChatThread
                    contact={contact}
                    messages={messages}
                    viewer="admin"
                    onSend={sendMessage}
                    sending={sending}
                    loading={messagesLoading}
                    error={error}
                />
            ) : (
                <div className="text-muted-foreground flex min-h-0 min-w-0 flex-1 items-center justify-center text-sm">
                    Chọn một cuộc trò chuyện để trả lời.
                </div>
            )}
        </div>
    );
}
