"use client";

import type { ReactNode } from "react";

export function BubbleOutgoing({ children }: { children: ReactNode }) {
    return (
        <div className="bg-primary text-primary-foreground max-w-[min(100%,22rem)] rounded-2xl rounded-tr-md px-3 py-2 text-sm leading-relaxed">
            {children}
        </div>
    );
}
