"use client";

import type { ReactNode } from "react";

export function BubbleIncoming({ children }: { children: ReactNode }) {
    return (
        <div className="bg-muted text-foreground max-w-[min(100%,22rem)] rounded-2xl rounded-tl-md px-3 py-2 text-sm leading-relaxed">
            {children}
        </div>
    );
}
