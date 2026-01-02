"use client";

import { Textarea } from "@/components/ui/textarea";
import useDebounce from "@/hooks/use-debounce";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

type Props = {
    className?: string;
    value: string;
    onChange: (value: string) => void;
    setError: (error: string | null) => void;
};

function TextArea({ className, value, onChange, setError }: Props) {
    const [inputValue, setInputValue] = useState(value);
    const debouceValue = useDebounce(inputValue, 300);

    useEffect(() => {
        if (debouceValue.trim() === "") {
            setError("Khong duoc de trong");
        } else {
            setError(null);
        }
        onChange(debouceValue);
    }, [debouceValue, setError]);

    return (
        <Textarea
            className={cn(
                className,
                "bg-background w-full resize-none ring-0!",
            )}
            rows={4}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
        />
    );
}

export default TextArea;
