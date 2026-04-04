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
            className="flex w-full min-w-0 flex-col gap-2 sm:flex-row sm:items-center"
            onSubmit={handleSubmit}
        >
            <Input
                placeholder="Search notifications"
                className="min-w-0 rounded-none sm:flex-1"
                value={searchValue}
                onChange={(e) => {
                    const value = e.target.value;
                    setSearchValue(value);
                    if (value.trim() === "") {
                        onSearching("");
                    }
                }}
            />

            <Button
                type="submit"
                className="w-full shrink-0 rounded-none sm:w-auto"
            >
                Search <Search />
            </Button>
        </form>
    );
}

export default SearchSection;
