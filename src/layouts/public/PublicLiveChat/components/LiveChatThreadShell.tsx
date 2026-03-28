import { ChatThread } from "@/app/admin/support/chat/components/ChatThread/ChatThread";
import type { ChatThreadContact } from "@/types/live-chat";
import type { MessageDto } from "@/types/live-chat";

type LiveChatThreadShellProps = {
    contact: ChatThreadContact;
    messages: MessageDto[];
    viewer: "admin" | "customer";
    onSend: (text: string) => void | Promise<void>;
    sending?: boolean;
    loading?: boolean;
    error?: string | null;
};

export function LiveChatThreadShell({
    contact,
    messages,
    viewer,
    onSend,
    sending,
    loading,
    error,
}: LiveChatThreadShellProps) {
    return (
        <div
            data-lenis-prevent
            className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden"
        >
            <ChatThread
                contact={contact}
                messages={messages}
                viewer={viewer}
                onSend={onSend}
                sending={sending}
                loading={loading}
                error={error}
            />
        </div>
    );
}
