"use client";

import { ConditionItem as ConditionType } from "@/components/FlowCanvas/types/node/action.type";
import SuggestVariable from "@/components/SuggestVariableInput/SuggestVariable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
    condition: ConditionType;
    ordinal: number;
    onCommit: (condition: ConditionType) => void;
    onDestroy: (condition: ConditionType) => void;
};

function ConditionItem({ condition, onCommit, onDestroy, ordinal }: Props) {
    const [localKey, setLocalKey] = useState(condition.key);
    const [localValue, setLocalValue] = useState(condition.value);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLocalKey(condition.key);
        setLocalValue(condition.value);
    }, [condition.key, condition.value]);

    const handleCommit = () => {
        if (localKey === condition.key && localValue === condition.value)
            return;

        onCommit({
            ...condition,
            key: localKey,
            value: localValue,
        });
    };

    return (
        <div className="group flex items-center gap-3 px-1 py-2 transition-colors hover:bg-neutral-50">
            <div className="min-w-[45px] text-xs font-bold text-neutral-500 uppercase">
                {ordinal === 0 ? (
                    <span className="text-neutral-900">Nếu</span>
                ) : (
                    <span>Và</span>
                )}
            </div>

            <div className="flex-1">
                <SuggestVariable
                    value={localKey}
                    onSelect={(val) => {
                        setLocalKey(val);
                        onCommit({ ...condition, key: val });
                    }}
                >
                    <Input
                        placeholder="Biến (Ví dụ: customer_name)"
                        value={localKey}
                        onChange={(e) => setLocalKey(e.target.value)}
                        onBlur={handleCommit}
                        className="h-9 border-0 bg-neutral-100/80 shadow-none focus-visible:ring-1 focus-visible:ring-neutral-300"
                    />
                </SuggestVariable>
            </div>

            <div className="font-mono font-bold text-neutral-400">=</div>

            <div className="flex-1">
                <Input
                    placeholder="Giá trị so sánh..."
                    value={localValue}
                    onChange={(e) => setLocalValue(e.target.value)}
                    onBlur={handleCommit}
                    className="h-9 border-0 bg-neutral-100/80 shadow-none focus-visible:ring-1 focus-visible:ring-neutral-300"
                />
            </div>

            <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-neutral-400 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-red-50 hover:text-red-600"
                onClick={() => onDestroy(condition)}
            >
                <Trash2 className="h-4 w-4" />
            </Button>
        </div>
    );
}

export default ConditionItem;
