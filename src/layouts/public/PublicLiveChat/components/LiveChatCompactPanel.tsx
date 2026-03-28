"use client";

import { MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import type { ChatThreadContact } from "@/types/live-chat";
import type { MessageDto } from "@/types/live-chat";

import { LiveChatThreadShell } from "./LiveChatThreadShell";
import { LiveChatWidgetChrome } from "./LiveChatWidgetChrome";

type LiveChatCompactPanelProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onExpand: () => void;
    contact: ChatThreadContact;
    messages: MessageDto[];
    viewer: "admin" | "customer";
    onSend: (text: string) => void | Promise<void>;
    sending?: boolean;
    loading?: boolean;
    error?: string | null;
};

export function LiveChatCompactPanel({
    open,
    onOpenChange,
    onExpand,
    contact,
    messages,
    viewer,
    onSend,
    sending,
    loading,
    error,
}: LiveChatCompactPanelProps) {
    return (
        <div className="fixed right-5 bottom-5 z-40 sm:right-6 sm:bottom-6">
            <Popover open={open} onOpenChange={onOpenChange}>
                <PopoverTrigger asChild>
                    <Button
                        type="button"
                        size="icon-lg"
                        className="size-14 rounded-full shadow-lg"
                        aria-expanded={open}
                        aria-label="Bật chat trực tiếp"
                    >
                        <MessageCircle className="size-7" strokeWidth={1.75} />
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    align="end"
                    side="top"
                    sideOffset={12}
                    className="flex h-[min(72dvh,560px)] w-[min(100vw-1.25rem,440px)] max-w-[calc(100vw-1.25rem)] flex-col overflow-hidden rounded-xl border p-0 shadow-xl"
                    onOpenAutoFocus={(e) => e.preventDefault()}
                    data-lenis-prevent
                >
                    <LiveChatWidgetChrome
                        showExpand
                        onExpand={onExpand}
                        onClose={() => onOpenChange(false)}
                    />
                    <LiveChatThreadShell
                        contact={contact}
                        messages={messages}
                        viewer={viewer}
                        onSend={onSend}
                        sending={sending}
                        loading={loading}
                        error={error}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}
