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
        <div className="pt-2">
            <Label className="mb-3">Truyền Url của bạn:</Label>
            <Input
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                onBlur={handleBlur}
                className="w-full"
                placeholder="Url..."
            />
        </div>
    );
}

export default ButtonUrl;
