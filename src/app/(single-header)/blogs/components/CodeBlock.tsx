"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
    language: string;
    children: string;
}

export function CodeBlock({ language, children }: CodeBlockProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(children);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="not-prose border-border my-6 overflow-hidden rounded-xl border bg-zinc-950">
            <div className="bg-muted/50 border-border flex items-center justify-between border-b px-4 py-2">
                <span className="text-muted-foreground font-mono text-xs">
                    {language}
                </span>
                <button
                    onClick={handleCopy}
                    className="hover:bg-muted rounded-md p-1.5 transition-colors"
                >
                    {copied ? (
                        <Check className="h-4 w-4 text-green-500" />
                    ) : (
                        <Copy className="text-muted-foreground h-4 w-4" />
                    )}
                </button>
            </div>
            <pre className="overflow-x-auto p-4 font-mono text-sm leading-6 text-zinc-300">
                <code>{children}</code>
            </pre>
        </div>
    );
}
