"use client";

import { extractVariableKeys } from "@/components/SuggestVariableInput/helpers";
import SuggestItem from "@/components/SuggestVariableInput/SuggestItem";
import useDebounce from "@/hooks/use-debounce";
import { cn } from "@/lib/utils";
import { useNodeStore } from "@/store/nodeStore";
import {
    cloneElement,
    isValidElement,
    ReactElement,
    useMemo,
    useState,
} from "react";

type FocusableProps = {
    onFocus?: React.FocusEventHandler<any>;
    onBlur?: React.FocusEventHandler<any>;
};

type Props = {
    children: ReactElement<FocusableProps>;
    value: string;
    onSelect: (value: string) => void;
};

function SuggestVariable({ children, value, onSelect }: Props) {
    const [open, setOpen] = useState(false);
    const nodes = useNodeStore((state) => state.nodes);
    const debouncedValue = useDebounce(value, 150);

    // Extract variable keys
    const variableKeys = useMemo(() => extractVariableKeys(nodes), [nodes]);

    // Filter variable keys based on input value
    const filtered = useMemo(() => {
        if (!debouncedValue) return variableKeys;

        return variableKeys.filter((key: string) =>
            key.toLowerCase().includes(debouncedValue.toLowerCase()),
        );
    }, [debouncedValue, variableKeys]);

    const child = isValidElement(children)
        ? cloneElement(children, {
              onFocus: (e) => {
                  children.props.onFocus?.(e);
                  setOpen(true);
              },
              onBlur: (e) => {
                  children.props.onBlur?.(e);
                  setOpen(false);
              },
          })
        : children;

    return (
        <div className="relative">
            <div>{child}</div>
            {open && (
                <div
                    className={cn(
                        "nodrag absolute right-0 -bottom-1 left-0 z-50 max-h-60 translate-y-full overflow-y-auto border bg-white shadow",
                    )}
                >
                    {filtered.map((key) => (
                        <SuggestItem
                            key={key}
                            value={key}
                            onSelect={(value) => {
                                onSelect(value);
                                setOpen(false);
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default SuggestVariable;
