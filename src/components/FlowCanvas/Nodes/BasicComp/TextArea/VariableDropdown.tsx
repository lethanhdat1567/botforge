"use client";

import { extractVariableKeys } from "@/components/SuggestVariableInput/helpers";
import useDebounce from "@/hooks/use-debounce";
import { useNodeStore } from "@/store/nodeStore";
import { useMemo } from "react";

type Props = {
    value: string;
    onSelect: (variable: string) => void;
};

function VariableDropdown({ value, onSelect }: Props) {
    const nodes = useNodeStore((state) => state.nodes);
    const query = useMemo(() => {
        const lastOpen = value.lastIndexOf("{{");
        const lastClose = value.lastIndexOf("}}");

        // không nằm trong mustache
        if (lastOpen === -1 || lastOpen < lastClose) return "";

        return value.slice(lastOpen + 2).trim();
    }, [value]);

    const debouncedValue = useDebounce(query, 150);

    const variableKeys = useMemo(() => extractVariableKeys(nodes), [nodes]);

    // Filter variable keys based on input value
    const filtered = useMemo(() => {
        if (!debouncedValue) return variableKeys;

        return variableKeys.filter((key: string) =>
            key.toLowerCase().includes(debouncedValue.toLowerCase()),
        );
    }, [debouncedValue, variableKeys]);

    if (!filtered.length) return null;

    return (
        <div className="nowheel nodrag absolute top-0 -right-1 z-50 max-h-50 w-60 translate-x-full overflow-y-auto border bg-white shadow">
            {filtered.map((key) => (
                <div
                    key={key}
                    className="cursor-pointer p-2 hover:bg-blue-500 hover:text-white"
                    onMouseDown={(e) => {
                        e.preventDefault();
                        onSelect(`{{ ${key} }}`);
                    }}
                >
                    {key}
                </div>
            ))}
        </div>
    );
}

export default VariableDropdown;
