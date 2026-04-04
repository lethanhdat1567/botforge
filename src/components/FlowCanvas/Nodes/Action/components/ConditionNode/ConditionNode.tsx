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
import { Handle, Position } from "@xyflow/react";
import ConditionBaseItem from "@/components/FlowCanvas/Nodes/Action/components/ConditionNode/components/ConditionBaseItem/ConditionBaseItem";

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
                    <button
                        type="button"
                        className="mb-3 w-full cursor-pointer rounded-md p-2 text-left transition-colors hover:bg-neutral-50/80"
                    >
                        <p className="mb-2 text-sm font-medium text-neutral-700">
                            Nhấn để chỉnh sửa
                        </p>
                        <div className="space-y-1.5">
                            {conditionItems.length === 0 ? (
                                <div className="py-3 text-center text-sm text-neutral-600">
                                    Chưa có điều kiện
                                </div>
                            ) : (
                                conditionItems.map((item, index) => (
                                    <div
                                        key={item.id}
                                        className="rounded-md px-1 py-1.5"
                                    >
                                        <ConditionBaseItem
                                            item={item}
                                            ordinal={index}
                                        />
                                    </div>
                                ))
                            )}
                        </div>
                    </button>
                </SheetTrigger>

                <SheetContent className="flex w-full flex-col bg-background sm:max-w-lg">
                    <SheetHeader className="space-y-1 pb-2 text-left">
                        <SheetTitle className="text-base font-semibold text-neutral-900">
                            Điều chỉnh dữ liệu điều kiện
                        </SheetTitle>
                    </SheetHeader>

                    <div className="min-h-0 flex-1 overflow-y-auto py-4">
                        <ConditionList
                            items={conditionItems}
                            nodeId={nodeId}
                            payloadId={payload.id}
                        />
                    </div>
                </SheetContent>
            </Sheet>

            <CreateCondition onCreate={handleCreateCondition} />

            <Handle
                type="source"
                position={Position.Right}
                id={`condition-source-${payload.id}`}
                className="h-2.5! w-2.5! cursor-crosshair rounded-full! border! border-neutral-300! bg-foreground! transition-all duration-150 hover:scale-125!"
            />
        </BaseContent>
    );
}

export default ConditionNode;
