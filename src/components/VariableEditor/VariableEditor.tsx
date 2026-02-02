"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

type Props = {
    value: string;
    onChange: (v: string) => void;
};

export default function VariableEditor({ value, onChange }: Props) {
    const ref = useRef<HTMLDivElement>(null);

    const handleInput = () => {
        const el = ref.current;
        if (!el) return;

        const rawText = el.innerText;
        onChange(rawText);

        el.innerHTML = rawText.replace(
            /(\{\{[^}]*\}\})/g,
            `<span class="text-blue-500 font-medium">$1</span>`,
        );
    };

    return (
        <div
            ref={ref}
            contentEditable
            suppressContentEditableWarning
            onInput={handleInput}
            className={cn(
                "min-h-24 w-full rounded-md border px-3 py-2",
                "text-sm leading-6 outline-none",
                "focus:border-ring",
            )}
        />
    );
}
