"use client";

import { Textarea } from "@/components/ui/textarea";
import useDebounce from "@/hooks/use-debounce";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

type Props = {
    className?: string;
    value: string;
    onChange: (value: string) => void;
    setErrors?: any;
};

function TextArea({ className, value, onChange, setErrors }: Props) {
    const [inputValue, setInputValue] = useState(value);
    const debouceValue = useDebounce(inputValue, 300);
    const isError = setErrors && !inputValue.trim();

    useEffect(() => {
        onChange(debouceValue);
    }, [debouceValue]);

    useEffect(() => {
        if (!setErrors) return;
        if (inputValue.trim() === "") {
            setErrors((prev: any[]) => {
                const hasTextError = prev.some(
                    (error) => error.field === "text",
                );

                if (hasTextError) {
                    // update lỗi text
                    return prev.map((error) =>
                        error.field === "text"
                            ? { ...error, message: "Text Không được để trống" }
                            : error,
                    );
                } else {
                    // thêm lỗi text mới
                    return [
                        ...prev,
                        { field: "text", message: "Text Không được để trống" },
                    ];
                }
            });
        } else {
            setErrors((prev: any) =>
                prev.filter((error: any) => error.field !== "text"),
            );
        }
    }, [inputValue]);

    return (
        <Textarea
            className={cn(
                className,
                "bg-background w-full resize-none ring-0!",
                isError && "border-red-300 focus:border-red-500!",
            )}
            rows={4}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
        />
    );
}

export default TextArea;
