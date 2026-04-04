import { ConditionItem } from "@/components/FlowCanvas/types/node/action.type";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { v4 as uuid } from "uuid";

type Props = {
    onCreate: (condition: ConditionItem) => void;
};

function CreateCondition({ onCreate }: Props) {
    function handleCreateNewCondition() {
        const newCondition: ConditionItem = {
            id: uuid(),
            key: "",
            value: "",
        };

        onCreate(newCondition);
    }

    return (
        <Button
            type="button"
            variant="outline"
            className="w-full rounded-md border-neutral-200 text-neutral-800 hover:bg-neutral-50"
            onClick={handleCreateNewCondition}
        >
            <Plus className="size-4" />
            Thêm điều kiện mới
        </Button>
    );
}

export default CreateCondition;
