"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

function ButtonUrl({
    onCommit,
    urlValue,
}: {
    onCommit: (value: string) => void;
    urlValue: string;
}) {
    const [urlInput, setUrlInput] = useState(urlValue);

    // sync khi undo / redo / external update
    useEffect(() => {
        setUrlInput(urlValue);
    }, [urlValue]);

    const handleBlur = () => {
        if (urlInput === urlValue) return;
        onCommit(urlInput);
    };

    return (
        <div>
            <Input
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                onBlur={handleBlur}
                className="w-full"
                placeholder="Đường dẫn..."
            />
            <p className="text-muted-foreground mt-3 text-xs">
                Vui lòng nhập đường dẫn hợp lệ để tránh bị lỗi cho flow.
            </p>
        </div>
    );
}

export default ButtonUrl;
