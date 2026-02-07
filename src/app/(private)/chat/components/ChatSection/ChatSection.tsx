"use client";

import ChatInput from "@/app/admin/support/chat/components/ChatWindow/components/ChatInput/ChatInput";
import ChatMessages from "@/app/admin/support/chat/components/ChatWindow/components/ChatMessage/ChatMessage";

function ChatSection() {
    return (
        <div>
            <div className="h-[64vh] overflow-y-scroll">
                <ChatMessages />
            </div>
            <ChatInput />
        </div>
    );
}

export default ChatSection;
