"use client";

import VariableDropdown from "@/components/FlowCanvas/Nodes/BasicComp/TextArea/VariableDropdown";
import { renderHighlightedText } from "@/components/FlowCanvas/Nodes/BasicComp/TextArea/helpers";
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
    const [showSuggest, setShowSuggest] = useState(false);

    const isError = setErrors && !inputValue.trim();

    /* sync khi parent đổi value */
    useEffect(() => {
        setInputValue(value);
    }, [value]);

    /* validation realtime */
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

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val = e.target.value;
        const pos = e.target.selectionStart;

        setInputValue(val);

        const beforeCursor = val.slice(0, pos);

        const open =
            beforeCursor.lastIndexOf("{{") > beforeCursor.lastIndexOf("}}");

        setShowSuggest(open);
    };

    const handleBlur = () => {
        if (inputValue !== value) {
            onCommit(inputValue.trim());
        }
        setShowSuggest(false);
    };

    return (
        <div className="relative w-full">
            {/* Highlight layer – GIỮ NGUYÊN */}
            <div className="pointer-events-none absolute inset-0 bg-white px-3 py-2 text-sm break-words whitespace-pre-wrap">
                {renderHighlightedText(inputValue)}
            </div>

            {/* Real textarea */}
            <Textarea
                className={cn(
                    className,
                    "relative w-full resize-none",
                    "caret-foreground bg-transparent text-transparent",
                    "ring-0!",
                    isError && "border-red-300 focus:border-red-500!",
                )}
                rows={4}
                value={inputValue}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={placeholder}
            />

            {/* Dropdown – chỉ nằm dưới textarea */}
            {showSuggest && (
                <VariableDropdown
                    value={inputValue}
                    onSelect={(value: string) => {
                        setInputValue(inputValue + value);
                        setShowSuggest(false);
                    }}
                />
            )}
        </div>
    );
}

export default TextArea;
