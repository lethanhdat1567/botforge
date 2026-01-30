"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

function SearchSection({
    onSearching,
}: {
    onSearching: (value: string) => void;
}) {
    const [searchValue, setSearchValue] = useState("");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        onSearching(searchValue.trim());
    }

    return (
        <form
            className="flex flex-1 items-center gap-2"
            onSubmit={handleSubmit}
        >
            <Input
                placeholder="Search notifications"
                className="rounded-none"
                value={searchValue}
                onChange={(e) => {
                    const value = e.target.value;
                    setSearchValue(value);
                    if (value.trim() === "") {
                        onSearching("");
                    }
                }}
            />

            <Button type="submit" className="rounded-none">
                Search <Search />
            </Button>
        </form>
    );
}

export default SearchSection;
