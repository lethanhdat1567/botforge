"use client";

import { CheckCheck } from "lucide-react";
import Image from "next/image";

import type { LiveChatSidebarItem } from "@/types/live-chat";
import { resolveMediaSrc } from "@/lib/image";

const rowInteractive =
    "flex w-full min-w-0 gap-2.5 rounded-lg p-2.5 text-left transition-colors items-start overflow-hidden";

type ChatSidebarRowProps = {
    item: LiveChatSidebarItem;
    isActive: boolean;
    onSelect: () => void;
};

export function ChatSidebarRow({
    item,
    isActive,
    onSelect,
}: ChatSidebarRowProps) {
    const hasUnread = item.unread > 0;
    const showSentTick = item.lastMessageRole === "admin";

    let rowClass = rowInteractive;
    if (isActive) {
        rowClass += " bg-muted/80 hover:bg-muted/90";
    } else if (hasUnread) {
        rowClass +=
            " bg-[#e7f3ff] hover:bg-[#dbeafe] dark:bg-blue-950/40 dark:hover:bg-blue-950/55";
    } else {
        rowClass += " hover:bg-muted/50";
    }

    const nameClass = hasUnread
        ? "text-foreground min-w-0 flex-1 truncate font-bold"
        : "text-foreground min-w-0 flex-1 truncate font-medium";

    const timeClass = hasUnread
        ? "max-w-[42%] min-w-0 shrink-0 truncate text-end text-xs font-semibold tabular-nums text-[#0084ff] dark:text-sky-400"
        : "text-muted-foreground max-w-[42%] min-w-0 shrink-0 truncate text-end text-xs tabular-nums";

    const previewClass = hasUnread
        ? "text-foreground min-w-0 flex-1 truncate text-sm font-semibold"
        : "text-muted-foreground min-w-0 flex-1 truncate text-sm";

    return (
        <li className="min-w-0">
            <button type="button" onClick={onSelect} className={rowClass}>
                <div className="bg-muted ring-offset-background relative size-11 shrink-0 overflow-hidden rounded-full">
                    {hasUnread ? (
                        <span
                            className="border-background absolute right-0 bottom-0 z-10 size-3 rounded-full border-2 bg-[#0084ff] dark:bg-sky-400"
                            aria-hidden
                        />
                    ) : null}
                    <Image
                        src={resolveMediaSrc(item.avatar)}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="44px"
                    />
                </div>
                <div className="min-w-0 flex-1 basis-0 overflow-hidden">
                    <div className="flex min-w-0 items-baseline gap-2">
                        <span className={nameClass} title={item.name}>
                            {item.name}
                        </span>
                        <span className={timeClass} title={item.time}>
                            {item.time}
                        </span>
                    </div>
                    <div className="mt-0.5 flex min-w-0 items-center gap-1.5">
                        {showSentTick ? (
                            <CheckCheck
                                className="size-3.5 shrink-0 text-emerald-500"
                                aria-hidden
                            />
                        ) : null}
                        <span className={previewClass} title={item.preview}>
                            {item.preview}
                        </span>
                    </div>
                </div>
                {item.unread > 0 ? (
                    <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-[#0084ff] px-1.5 text-[11px] font-bold whitespace-nowrap text-white dark:bg-sky-500">
                        {item.unread > 99 ? "99+" : item.unread}
                    </span>
                ) : null}
            </button>
        </li>
    );
}
