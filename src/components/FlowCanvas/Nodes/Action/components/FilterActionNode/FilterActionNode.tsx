import ConditionNode from "@/components/FlowCanvas/Nodes/Action/components/ConditionNode/ConditionNode";
import DelayNode from "@/components/FlowCanvas/Nodes/Action/components/DelayNode/DelayNode";
import SetVariableNode from "@/components/FlowCanvas/Nodes/Action/components/SetVariableNode/SetVariableNode";
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
        case "condition":
            return <ConditionNode nodeId={nodeId} payload={payload} />;
        case "set_variable":
            return <SetVariableNode nodeId={nodeId} payload={payload} />;
        default:
            return <div>Unknown Action Node Type</div>;
    }
}

export default FilterActionNode;
