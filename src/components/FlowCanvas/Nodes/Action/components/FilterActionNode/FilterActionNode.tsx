import DelayNode from "@/components/FlowCanvas/Nodes/Action/components/DelayNode/DelayNode";
import { ActionData } from "@/components/FlowCanvas/types/node/action.type";

function FilterActionNode({
    nodeId,
    payload,
}: {
    nodeId: string;
    payload: ActionData;
}) {
    switch (payload.type) {
        case "delay":
            return <DelayNode nodeId={nodeId} payload={payload} />;
        // case "condition":
        //     return <ConditionNode node={node} />;
        // case "set_variable":
        //     return <SetVariableNode node={node} />;
        default:
            return <div>Unknown Action Node Type</div>;
    }
}

export default FilterActionNode;
