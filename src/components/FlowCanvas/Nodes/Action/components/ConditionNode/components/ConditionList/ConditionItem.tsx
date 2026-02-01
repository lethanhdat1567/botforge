"use client";

import { formatConditionOperator } from "@/components/FlowCanvas/Nodes/Action/components/ConditionNode/components/ConditionList/helpers";
import { ConditionItem as ConditionType } from "@/components/FlowCanvas/types/node/action.type";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
    condition: ConditionType;
    ordinal: number;
    onCommit: (condition: ConditionType) => void;
    onDestroy: (condition: ConditionType) => void;
};

function ConditionItem({ condition, onCommit, onDestroy, ordinal }: Props) {
    const [key, setKey] = useState(condition.field);
    const [value, setValue] = useState(condition.value);

    // sync undo / redo
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setKey(condition.field);
    }, [condition.field]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setValue(condition.value);
    }, [condition.value]);

    const commitChange = () => {
        if (key === condition.field && value === condition.value) return;

        onCommit({
            ...condition,
            field: key,
            value,
        });
    };

    return (
        <div className="grid grid-cols-[40px_40px_1fr_auto_1fr] items-center gap-2">
            {/* Delete */}
            <Button
                size="icon"
                variant="destructive"
                onClick={() => onDestroy(condition)}
            >
                <Trash className="h-4 w-4" />
            </Button>

            {/* Nếu / Và */}
            <div className="text-sm font-medium">
                {ordinal > 0 ? "Và" : "Nếu"}
            </div>

            {/* Field */}
            <Input
                placeholder="Biến..."
                value={key}
                onChange={(e) => setKey(e.target.value)}
                onBlur={commitChange}
            />

            {/* Operator */}
            <div className="text-center text-sm">
                {formatConditionOperator(condition.operator)}
            </div>

            {/* Value */}
            <Input
                placeholder="Giá trị..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onBlur={commitChange}
            />
        </div>
    );
}

export default ConditionItem;
