"use client";

import { ChatThread } from "@/app/admin/support/chat/components/ChatThread/ChatThread";
import { useLiveChatThread } from "@/hooks/useLiveChatThread";

export function UserSupportChatView() {
    const { contact, messages, loading, sending, error, sendMessage, viewer } =
        useLiveChatThread({ enabled: true });

    // Khớp layout private: header ~4–4.5rem + padding shell (p-3–p-6)
    return (
        <div
            className="flex h-[calc(100dvh-8.5rem)] min-h-[min(50dvh,24rem)] min-w-0 shrink-0 flex-col overflow-hidden sm:h-[calc(100dvh-7.5rem)]"
            data-slot="user-support-chat"
        >
            <ChatThread
                contact={contact}
                messages={messages}
                viewer={viewer}
                onSend={sendMessage}
                sending={sending}
                loading={loading}
                error={error}
            />
        </div>
    );
}
