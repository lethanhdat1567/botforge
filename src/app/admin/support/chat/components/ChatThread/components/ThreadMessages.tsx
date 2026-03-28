"use client";

import Image from "next/image";

import { resolveChatMediaUrl } from "@/services/liveChatApi";
import type { MessageDto } from "@/types/live-chat";
import { format } from "date-fns";
import { useEffect, useRef } from "react";

import { BubbleIncoming } from "./BubbleIncoming";
import { BubbleOutgoing } from "./BubbleOutgoing";
import { MessageStatus } from "./MessageStatus";

type ThreadMessagesProps = {
    messages: MessageDto[];
    viewer: "admin" | "customer";
};

function isOutgoingForViewer(m: MessageDto, viewer: "admin" | "customer"): boolean {
    if (viewer === "customer") {
        return m.role === "user";
    }
    return m.role === "admin";
}

export function ThreadMessages({ messages, viewer }: ThreadMessagesProps) {
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    if (messages.length === 0) {
        return (
            <p className="text-muted-foreground p-4 text-center text-sm">
                Chưa có tin nhắn. Hãy bắt đầu cuộc trò chuyện.
            </p>
        );
    }

    return (
        <div className="flex flex-col gap-4 p-4">
            {messages.map((m) => {
                const outgoing = isOutgoingForViewer(m, viewer);
                const time = format(new Date(m.createdAt), "HH:mm");
                const revoked = !!m.revokedAt;

                if (revoked) {
                    return (
                        <p
                            key={m.id}
                            className="text-muted-foreground text-center text-xs italic"
                        >
                            Tin nhắn đã được thu hồi
                        </p>
                    );
                }

                const text = m.content?.trim() ?? "";
                const mediaUrl = resolveChatMediaUrl(m.fileUrl);

                if (mediaUrl && !text) {
                    const bubble = (
                        <div className="relative max-w-[min(100%,280px)] overflow-hidden rounded-xl">
                            <Image
                                src={mediaUrl}
                                alt=""
                                width={640}
                                height={480}
                                className="h-auto w-full object-cover"
                                unoptimized
                            />
                        </div>
                    );
                    return (
                        <div
                            key={m.id}
                            className={
                                outgoing
                                    ? "flex flex-col items-end"
                                    : "flex flex-col items-start"
                            }
                        >
                            {outgoing ? (
                                <>
                                    {bubble}
                                    <MessageStatus time={time} />
                                </>
                            ) : (
                                <>
                                    {bubble}
                                    <span className="text-muted-foreground mt-1 text-xs">
                                        {time}
                                    </span>
                                </>
                            )}
                        </div>
                    );
                }

                if (!text && !mediaUrl) {
                    return null;
                }

                const body =
                    outgoing ? (
                        <BubbleOutgoing>{text}</BubbleOutgoing>
                    ) : (
                        <BubbleIncoming>{text}</BubbleIncoming>
                    );

                return (
                    <div
                        key={m.id}
                        className={
                            outgoing
                                ? "flex flex-col items-end"
                                : "flex flex-col items-start"
                        }
                    >
                        {body}
                        {outgoing ? (
                            <MessageStatus time={time} />
                        ) : (
                            <span className="text-muted-foreground mt-1 text-xs">
                                {time}
                            </span>
                        )}
                    </div>
                );
            })}
            <div ref={bottomRef} className="h-0 w-full shrink-0" aria-hidden />
        </div>
    );
}
