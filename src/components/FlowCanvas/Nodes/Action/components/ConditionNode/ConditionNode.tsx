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
import { renderConditionText } from "@/components/FlowCanvas/Nodes/Action/components/ConditionNode/components/ConditionList/helpers";
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
            <Sheet>
                <SheetTrigger asChild>
                    <div className="mb-3 cursor-pointer space-y-2">
                        {conditionItems.map((item, index) => (
                            <div
                                key={index}
                                className="rounded-sm bg-white p-2"
                            >
                                <div className="text-foreground text-sm">
                                    {renderConditionText(item)}
                                </div>
                            </div>
                        ))}
                    </div>
                </SheetTrigger>

                {/* Content */}
                <SheetContent className="min-w-[40vw]!">
                    <SheetHeader>
                        <SheetTitle>Điều chỉnh dữ liệu điều kiện</SheetTitle>
                    </SheetHeader>

                    <ConditionList
                        items={conditionItems}
                        nodeId={nodeId}
                        payloadId={payload.id}
                    />
                </SheetContent>
            </Sheet>

            <CreateCondition onCreate={handleCreateCondition} />

            <Handle
                type="source"
                position={Position.Right}
                id={`condition-source-${payload.id}`}
                className="bg-muted-foreground! hover:bg-foreground! h-2.5! w-2.5! cursor-crosshair rounded-full! border transition-all duration-150 hover:scale-125!"
            />
        </BaseContent>
    );
}

export default ConditionNode;
