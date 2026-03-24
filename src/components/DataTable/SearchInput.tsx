// components/shared/search-input.tsx
"use client";

import { useEffect, useState } from "react";
import useDebounce from "@/hooks/use-debounce";
import { Search } from "lucide-react";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";

interface SearchInputProps {
    placeholder?: string;
    defaultValue?: string;
    onChange: (value: string) => void;
    delay?: number;
}

export default function SearchInput({
    placeholder = "Tìm kiếm quy trình...",
    defaultValue = "",
    onChange,
    delay = 500,
}: SearchInputProps) {
    const [value, setValue] = useState(defaultValue);
    const debouncedValue = useDebounce(value, delay);

    // Xử lý logic debounce để trả kết quả ra ngoài
    useEffect(() => {
        onChange(debouncedValue);
    }, [debouncedValue, onChange]);

    return (
        <InputGroup className="w-md">
            <InputGroupInput
                placeholder={placeholder}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <InputGroupAddon>
                <Search className="h-4 w-4" />
            </InputGroupAddon>
        </InputGroup>
    );
}
