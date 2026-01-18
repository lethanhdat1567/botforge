import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import BaseContent from "@/components/FlowCanvas/Nodes/BaseContent/BaseContent";
import {
    ConditionActionData,
    ConditionItem,
} from "@/components/FlowCanvas/types/node/action.type";
import ConditionList from "@/components/FlowCanvas/Nodes/Action/components/ConditionNode/components/ConditionList/ConditionList";
import CreateCondition from "@/components/FlowCanvas/Nodes/Action/components/ConditionNode/components/ConditionList/CreateCondition";
import { FlowController } from "@/components/FlowCanvas/Controller/FlowController";
import { formatConditionOperator } from "@/components/FlowCanvas/Nodes/Action/components/ConditionNode/components/ConditionList/helpers";
import { Handle, Position } from "@xyflow/react";

type Props = { nodeId: string; payload: ConditionActionData };

function ConditionNode({ nodeId, payload }: Props) {
    const conditionItems = payload.fields.items;

    function handleCreateCondition(condition: ConditionItem) {
        FlowController.updateNodePayload(nodeId, payload.id, {
            items: [...conditionItems, condition],
        });
    }

    return (
        <BaseContent nodeId={nodeId} payloadId={payload.id}>
            {/* Condition items */}
            {conditionItems.map((item, index) => (
                <Sheet key={index}>
                    <SheetTrigger asChild>
                        <div className="cursor-pointer rounded-sm bg-neutral-100 p-2">
                            <div>
                                Nếu {item.field || "_"}{" "}
                                {formatConditionOperator(item.operator)}{" "}
                                {item.value || "_"}
                            </div>
                        </div>
                    </SheetTrigger>
                    <SheetContent className="min-w-[40vw]!">
                        <SheetHeader>
                            <SheetTitle>
                                Điều chỉnh dữ liệu điều kiện
                            </SheetTitle>
                        </SheetHeader>
                        <ConditionList
                            items={conditionItems}
                            nodeId={nodeId}
                            payloadId={payload.id}
                        />
                    </SheetContent>
                </Sheet>
            ))}
            <CreateCondition onCreate={handleCreateCondition} />

            <Handle
                type="source"
                position={Position.Right}
                id={`condition-source-${payload.id}`}
                className="bg-yellow-500! p-1"
            />
        </BaseContent>
    );
}

export default ConditionNode;
