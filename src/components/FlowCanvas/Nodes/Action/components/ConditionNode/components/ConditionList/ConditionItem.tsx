import { formatConditionOperator } from "@/components/FlowCanvas/Nodes/Action/components/ConditionNode/components/ConditionList/helpers";
import { ConditionItem as ConditionType } from "@/components/FlowCanvas/types/node/action.type";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/use-debounce";
import { Trash } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
    condition: ConditionType;
    onUpdate: (condition: ConditionType) => void;
    onDestroy: (condition: ConditionType) => void;
};

function ConditionItem({ condition, onUpdate, onDestroy }: Props) {
    const [key, setKey] = useState(condition.field);
    const [value, setValue] = useState(condition.value);
    const debounceKey = useDebounce(key, 500);
    const debounceValue = useDebounce(value, 500);

    useEffect(() => {
        onUpdate({ ...condition, field: debounceKey, value: debounceValue });
    }, [debounceKey, debounceValue]);

    return (
        <div className="flex items-center gap-2">
            <Button
                variant={"destructive"}
                onClick={() => onDestroy(condition)}
            >
                <Trash />
            </Button>

            <div>Nếu</div>

            {/* Key */}
            <Input
                placeholder="Key"
                value={key}
                onChange={(e) => setKey(e.target.value)}
            />

            {/* Operator */}
            <div>{formatConditionOperator(condition.operator)}</div>

            {/* Value */}
            <Input
                placeholder="Value"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    );
}

export default ConditionItem;
