"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { ChatThreadContact } from "@/types/live-chat";
import type { MessageDto } from "@/types/live-chat";

import { LiveChatFullscreenToolbar } from "./LiveChatFullscreenToolbar";
import { LiveChatThreadShell } from "./LiveChatThreadShell";

type LiveChatFullscreenDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onShrink: () => void;
    contact: ChatThreadContact;
    messages: MessageDto[];
    viewer: "admin" | "customer";
    onSend: (text: string) => void | Promise<void>;
    sending?: boolean;
    loading?: boolean;
    error?: string | null;
};

export function LiveChatFullscreenDialog({
    open,
    onOpenChange,
    onShrink,
    contact,
    messages,
    viewer,
    onSend,
    sending,
    loading,
    error,
}: LiveChatFullscreenDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                showCloseButton={false}
                className="fixed top-0 left-0 z-50 flex h-dvh max-h-dvh w-screen max-w-none translate-x-0 translate-y-0 flex-col gap-0 rounded-none border-0 p-0 shadow-none outline-none sm:max-w-none"
            >
                <DialogTitle className="sr-only">Chat trực tiếp</DialogTitle>
                <LiveChatFullscreenToolbar onShrink={onShrink} />
                <LiveChatThreadShell
                    contact={contact}
                    messages={messages}
                    viewer={viewer}
                    onSend={onSend}
                    sending={sending}
                    loading={loading}
                    error={error}
                />
            </DialogContent>
        </Dialog>
    );
}
