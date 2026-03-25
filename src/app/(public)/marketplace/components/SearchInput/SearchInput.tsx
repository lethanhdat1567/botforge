"use client";

import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";
import useDebounce from "@/hooks/use-debounce";
import { SearchIcon, Loader2, X } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
    value: string;
    onChange: (value: string) => void;
    isLoading?: boolean;
};

function SearchInput({ value, onChange, isLoading = false }: Props) {
    const [localValue, setLocalValue] = useState(value);

    // Debounce giá trị local
    const debouncedValue = useDebounce(localValue, 500);

    useEffect(() => {
        onChange(debouncedValue);
    }, [debouncedValue, onChange]);

    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    const handleClear = () => {
        setLocalValue("");
        onChange("");
    };

    return (
        <div className="mx-auto mt-6 w-full max-w-2xl">
            <InputGroup className="border-border/40 bg-background focus-within:ring-primary/10 h-10 transition-all focus-within:ring-1">
                <InputGroupInput
                    placeholder="Tìm kiếm kịch bản..."
                    value={localValue}
                    onChange={(e) => setLocalValue(e.target.value)}
                    className="border-none text-xs font-medium focus-visible:ring-0"
                />

                <InputGroupAddon className="border-none bg-transparent px-3">
                    {isLoading ? (
                        <Loader2 className="text-muted-foreground/60 h-3.5 w-3.5 animate-spin" />
                    ) : localValue ? (
                        <X
                            className="text-muted-foreground/60 hover:text-foreground h-3.5 w-3.5 cursor-pointer transition-colors"
                            onClick={handleClear}
                        />
                    ) : (
                        <SearchIcon className="text-muted-foreground/40 h-3.5 w-3.5" />
                    )}
                </InputGroupAddon>
            </InputGroup>
        </div>
    );
}

export default SearchInput;
