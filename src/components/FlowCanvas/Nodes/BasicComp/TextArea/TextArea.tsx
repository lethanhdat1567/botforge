"use client";

import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

type Props = {
    className?: string;
    value: string;
    onCommit: (value: string) => void;
    setErrors?: any;
    placeholder?: string;
};

function TextArea({
    className,
    value,
    onCommit,
    setErrors,
    placeholder,
}: Props) {
    const [inputValue, setInputValue] = useState(value);

    const isError = setErrors && !inputValue.trim();

    // sync khi parent đổi value (undo / redo)
    useEffect(() => {
        setInputValue(value);
    }, [value]);

    // validation realtime
    useEffect(() => {
        if (!setErrors) return;

        if (!inputValue.trim()) {
            setErrors((prev: any[]) => {
                const exists = prev.some((e) => e.field === "text");
                return exists
                    ? prev.map((e) =>
                          e.field === "text"
                              ? {
                                    ...e,
                                    message: "Nội dung không được để trống",
                                }
                              : e,
                      )
                    : [
                          ...prev,
                          {
                              field: "text",
                              message: "Nội dung không được để trống",
                          },
                      ];
            });
        } else {
            setErrors((prev: any[]) => prev.filter((e) => e.field !== "text"));
        }
    }, [inputValue, setErrors]);

    const handleBlur = () => {
        if (inputValue === value) return; // không đổi → không commit
        onCommit(inputValue.trim());
    };

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
            onBlur={handleBlur}
            placeholder={placeholder}
        />
    );
}

export default TextArea;
