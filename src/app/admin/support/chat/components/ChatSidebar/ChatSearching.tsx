"use client";

import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/use-debounce";
import { useEffect, useState } from "react";

type ChatSearchingProps = {
    onSearching: (value: string) => void;
};

function ChatSearching({ onSearching }: ChatSearchingProps) {
    const [value, setValue] = useState("");

    // debounce chỉ tạo 1 lần
    const searchDebounce = useDebounce(value, 300);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setValue(val);
    };

    useEffect(() => {
        onSearching(searchDebounce);
    }, [searchDebounce]);

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold">Chats</h2>
            <Input
                className="mt-4"
                placeholder="Search chat…"
                value={value}
                onChange={onChange}
            />
        </div>
    );
}

export default ChatSearching;
