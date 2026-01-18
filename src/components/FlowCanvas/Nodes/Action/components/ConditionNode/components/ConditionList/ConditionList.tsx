import { FlowController } from "@/components/FlowCanvas/Controller/FlowController";
import ConditionItem from "@/components/FlowCanvas/Nodes/Action/components/ConditionNode/components/ConditionList/ConditionItem";
import CreateCondition from "@/components/FlowCanvas/Nodes/Action/components/ConditionNode/components/ConditionList/CreateCondition";
import { ConditionItem as ConditionType } from "@/components/FlowCanvas/types/node/action.type";

type Props = {
    items: ConditionType[];
    nodeId: string;
    payloadId: string;
};

function ConditionList({ items, nodeId, payloadId }: Props) {
    function handleCreateCondition(condition: ConditionType) {
        FlowController.updateNodePayload(nodeId, payloadId, {
            items: [...items, condition],
        });
    }

    function handleDestroyCondition(condition: ConditionType) {
        FlowController.updateNodePayload(nodeId, payloadId, {
            items: items.filter((item) => item.id !== condition.id),
        });
    }

    function handleUpdateCondition(condition: ConditionType) {
        const newList = items.map((item) =>
            item.id === condition.id ? condition : item,
        );

        FlowController.updateNodePayload(nodeId, payloadId, { items: newList });
    }

    return (
        <div className="space-y-4 px-4">
            {items.map((item, index) => (
                <ConditionItem
                    condition={item}
                    key={index}
                    onCommit={handleUpdateCondition}
                    onDestroy={handleDestroyCondition}
                />
            ))}
            <CreateCondition onCreate={handleCreateCondition} />
        </div>
    );
}

export default ConditionList;
