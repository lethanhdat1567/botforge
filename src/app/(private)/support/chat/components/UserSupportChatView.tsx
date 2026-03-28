"use client";

import { ChatThread } from "@/app/admin/support/chat/components/ChatThread/ChatThread";
import { useLiveChatThread } from "@/hooks/useLiveChatThread";

export function UserSupportChatView() {
    const { contact, messages, loading, sending, error, sendMessage, viewer } =
        useLiveChatThread({ enabled: true });

    // 100dvh − PrivateHeader (h-16) − padding dọc p-4 × 2
    return (
        <div
            className="flex h-[calc(100dvh-7rem)] min-h-0 min-w-0 shrink-0 flex-col overflow-hidden"
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
