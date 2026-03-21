"use client";

import useDebounce from "@/hooks/use-debounce";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";

type Props = {
    onSearching: (value: string) => void;
};

function SearchSection({ onSearching }: Props) {
    const [keyword, setKeyword] = useState("");
    const debounced = useDebounce(keyword, 400);

    useEffect(() => {
        onSearching(debounced.trim());
    }, [debounced]);

    return (
        <div className="mx-auto mt-10 flex w-4xl items-center gap-3 border border-neutral-200 bg-white px-4 py-3 shadow">
            <Search className="h-5 w-5 text-neutral-400" />
            <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full bg-transparent text-sm outline-none"
                placeholder="Tìm kiếm hướng dẫn..."
            />
        </div>
    );
}

export default SearchSection;
