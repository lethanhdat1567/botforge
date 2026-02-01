"use client";

import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";

const MAX_LENGTH = 500;

type Props = {
    value: string;
    onChange: (message: string) => void;
};

function FallbackMessage({ value, onChange }: Props) {
    const [localMessage, setLocalMessage] = useState<string>(value || "");

    // sync khi parent fetch xong data
    useEffect(() => {
        setLocalMessage(value);
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.target.value;

        if (text.length > MAX_LENGTH) return;

        setLocalMessage(text);
    };

    const handleBlur = () => {
        const trimmed = localMessage.trim();

        setLocalMessage(trimmed);
        onChange(trimmed);
    };

    return (
        <div className="w-full space-y-2">
            <label className="text-md mb-2 block font-medium">
                Tin nhắn khi hết thời gian chờ
            </label>

            <Textarea
                value={localMessage}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Nhập nội dung bot sẽ gửi nếu người dùng không phản hồi trong thời gian quy định..."
                className="min-h-25 w-full resize-none"
            />

            <div className="text-muted-foreground flex justify-between text-xs">
                <span>
                    {localMessage?.length === 0
                        ? "Tin nhắn này sẽ được gửi khi người dùng không phản hồi."
                        : " "}
                </span>
                <span>
                    {localMessage.length}/{MAX_LENGTH}
                </span>
            </div>
        </div>
    );
}

export default FallbackMessage;
