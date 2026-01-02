"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

function ButtonSelect({ open }: { open: boolean }) {
    const [action, setAction] = useState<"continue" | "open-url">("continue");
    const [url, setUrl] = useState("");

    if (!open) return null;

    return (
        <div
            className="bg-background absolute top-1/2 -right-4 w-80 translate-x-full -translate-y-1/2 border p-2 shadow"
            onClick={(e) => e.stopPropagation()} // tránh bị tắt khi click
        >
            <div className="mb-3 flex items-center justify-between">
                <span>Next Flow</span>

                <Select
                    value={action}
                    onValueChange={(v) => setAction(v as any)}
                >
                    <SelectTrigger className="w-40">
                        <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="continue">Tiếp tục flow</SelectItem>
                        <SelectItem value="open-url">Mở URL</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* ===== Content ===== */}
            {action === "continue" && (
                <p className="text-muted-foreground text-sm">
                    Flow sẽ tiếp tục sang node tiếp theo.
                </p>
            )}

            {action === "open-url" && (
                <input
                    className="bg-background w-full rounded border p-2 text-sm"
                    placeholder="https://example.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
            )}
        </div>
    );
}

export default ButtonSelect;
