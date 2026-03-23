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
    // Sử dụng state local để input mượt mà
    const [localKey, setLocalKey] = useState(condition.key);
    const [localValue, setLocalValue] = useState(condition.value);

    // Sync lại state khi dữ liệu từ store thay đổi (Undo/Redo)
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLocalKey(condition.key);
        setLocalValue(condition.value);
    }, [condition.key, condition.value]);

    const handleCommit = () => {
        // Chỉ commit nếu thực sự có thay đổi
        if (localKey === condition.key && localValue === condition.value)
            return;

        onCommit({
            ...condition,
            key: localKey,
            value: localValue,
        });
    };

    return (
        <div className="group flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-slate-50">
            {/* STT / Logic Label */}
            <div className="min-w-[45px] text-xs font-bold text-slate-400 uppercase">
                {ordinal === 0 ? (
                    <span className="text-blue-600">Nếu</span>
                ) : (
                    <span>Và</span>
                )}
            </div>

            {/* Field Input với Suggestion */}
            <div className="flex-1">
                <SuggestVariable
                    value={localKey}
                    onSelect={(val) => {
                        setLocalKey(val);
                        // Vì onSelect thường là click chuột, nên commit luôn
                        onCommit({ ...condition, key: val });
                    }}
                >
                    <Input
                        placeholder="Biến (Ví dụ: customer_name)"
                        value={localKey}
                        onChange={(e) => setLocalKey(e.target.value)}
                        onBlur={handleCommit}
                        className="h-9 bg-white shadow-sm focus-visible:ring-blue-400"
                    />
                </SuggestVariable>
            </div>

            {/* Operator giả lập - Vì bạn nói không có operator nên để dấu '=' hoặc icon nhẹ */}
            <div className="font-mono font-bold text-slate-300">=</div>

            {/* Value Input */}
            <div className="flex-1">
                <Input
                    placeholder="Giá trị so sánh..."
                    value={localValue}
                    onChange={(e) => setLocalValue(e.target.value)}
                    onBlur={handleCommit}
                    className="h-9 bg-white shadow-sm focus-visible:ring-blue-400"
                />
            </div>

            {/* Delete Button - Chỉ hiện rõ khi hover vào row cho gọn */}
            <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-slate-400 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-red-50 hover:text-red-600"
                onClick={() => onDestroy(condition)}
            >
                <Trash2 className="h-4 w-4" />
            </Button>
        </div>
    );
}

export default ConditionItem;
