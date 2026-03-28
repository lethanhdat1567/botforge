"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Paperclip } from "lucide-react";
import { useState } from "react";

type ThreadComposerProps = {
    onSend: (text: string) => void | Promise<void>;
    disabled?: boolean;
    /** Chỉ khóa nút Gửi khi đang gửi; ô nhập vẫn dùng được (giống Messenger). */
    sendBusy?: boolean;
};

export function ThreadComposer({
    onSend,
    disabled,
    sendBusy,
}: ThreadComposerProps) {
    const [value, setValue] = useState("");

    async function submit() {
        const t = value.trim();
        if (!t || disabled || sendBusy) {
            return;
        }
        setValue("");
        await onSend(t);
    }

    return (
        <footer className="shrink-0 border-t px-3 py-4">
            <div className="flex min-w-0 items-center gap-2">
                <div className="border-input focus-within:ring-ring/50 bg-muted/40 flex min-h-10 min-w-0 flex-1 items-center rounded-lg border px-2 shadow-xs focus-within:ring-[3px]">
                    <Input
                        placeholder="Nhắn tin…"
                        className="min-w-0 flex-1 border-0 bg-transparent shadow-none focus-visible:ring-0 md:text-sm"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        disabled={disabled}
                        onKeyDown={(e) => {
                            if (
                                e.key === "Enter" &&
                                !e.shiftKey &&
                                !sendBusy
                            ) {
                                e.preventDefault();
                                void submit();
                            }
                        }}
                    />
                    <Button
                        variant="ghost"
                        size="icon-sm"
                        type="button"
                        aria-label="Đính kèm (sắp có)"
                        className="text-muted-foreground shrink-0"
                        disabled
                    >
                        <Paperclip className="size-4" />
                    </Button>
                </div>
                <Button
                    type="button"
                    size="sm"
                    className="shrink-0 px-4"
                    disabled={disabled || sendBusy || !value.trim()}
                    onClick={() => void submit()}
                >
                    {sendBusy ? "Đang gửi…" : "Gửi"}
                </Button>
            </div>
        </footer>
    );
}
