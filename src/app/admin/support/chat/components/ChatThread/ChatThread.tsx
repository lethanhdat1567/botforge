"use client";

import Image from "next/image";

import type { ChatThreadContact, MessageDto } from "@/types/live-chat";

import { ThreadComposer } from "./components/ThreadComposer";
import { ThreadMessages } from "./components/ThreadMessages";
import { resolveMediaSrc } from "@/lib/image";

type ChatThreadProps = {
    contact: ChatThreadContact;
    messages: MessageDto[];
    viewer: "admin" | "customer";
    onSend: (text: string) => void | Promise<void>;
    /** Đang gửi: chỉ chặn nút Gửi, không ẩn cả khung chat. */
    sending?: boolean;
    loading?: boolean;
    error?: string | null;
};

export function ChatThread({
    contact,
    messages,
    viewer,
    onSend,
    sending,
    loading,
    error,
}: ChatThreadProps) {
    return (
        <section className="bg-background flex h-full min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
            <header className="flex shrink-0 items-center gap-2.5 border-b px-4 py-2.5">
                <div className="bg-muted relative size-9 shrink-0 overflow-hidden rounded-full">
                    <Image
                        src={resolveMediaSrc(contact.avatar)}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="36px"
                    />
                </div>
                <h2
                    className="text-foreground min-w-0 truncate text-sm font-semibold"
                    title={contact.name}
                >
                    {contact.name}
                </h2>
            </header>

            {error ? (
                <p className="text-destructive px-4 py-2 text-sm">{error}</p>
            ) : null}

            <div
                className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-y-contain"
                data-slot="chat-thread-messages"
            >
                {loading ? (
                    <p className="text-muted-foreground p-4 text-sm">
                        Đang tải tin nhắn…
                    </p>
                ) : (
                    <ThreadMessages messages={messages} viewer={viewer} />
                )}
            </div>

            <ThreadComposer
                onSend={onSend}
                disabled={!!loading}
                sendBusy={!!sending}
            />
        </section>
    );
}
