"use client";

import ChatInput from "@/app/admin/support/chat/components/ChatWindow/components/ChatInput/ChatInput";
import ChatMessages from "@/app/admin/support/chat/components/ChatWindow/components/ChatMessage/ChatMessage";

function ChatSection() {
    return (
        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
                <ChatMessages />
            </div>
            <div className="shrink-0 pt-2">
                <ChatInput />
            </div>
        </div>
    );
}

export default ChatSection;
