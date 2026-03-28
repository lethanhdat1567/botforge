"use client";

import { CheckCheck } from "lucide-react";

export function MessageStatus({ time }: { time: string }) {
    return (
        <div className="text-muted-foreground mt-1 flex items-center justify-end gap-1 text-xs">
            <span>{time}</span>
            <CheckCheck className="size-3.5 text-emerald-500" aria-hidden />
        </div>
    );
}
