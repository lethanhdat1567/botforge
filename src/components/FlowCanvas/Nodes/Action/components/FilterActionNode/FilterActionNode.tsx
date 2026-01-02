import ConditionNode from "@/components/FlowCanvas/Nodes/Action/components/ConditionNode/ConditionNode";
import DelayNode from "@/components/FlowCanvas/Nodes/Action/components/DelayNode/DelayNode";
import SetVariableNode from "@/components/FlowCanvas/Nodes/Action/components/SetVariableNode/SetVariableNode";

function FilterActionNode({ node }: { node: any }) {
    switch (node.type) {
        case "delay":
            return <DelayNode node={node} />;
        case "condition":
            return <ConditionNode node={node} />;
        case "set_variable":
            return <SetVariableNode node={node} />;
        default:
            return <div>Unknown Action Node Type</div>;
    }
}

export default FilterActionNode;
