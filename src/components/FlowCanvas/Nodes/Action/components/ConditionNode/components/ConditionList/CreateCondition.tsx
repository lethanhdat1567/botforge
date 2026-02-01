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
            field: "",
            operator: "equals",
            value: "",
        };

        onCreate(newCondition);
    }

    return (
        <Button
            className="w-full rounded-none"
            onClick={handleCreateNewCondition}
        >
            <Plus /> Thêm điều kiện mới
        </Button>
    );
}

export default CreateCondition;
