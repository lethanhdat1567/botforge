import BaseContent from "@/components/FlowCanvas/Nodes/BaseContent/BaseContent";

function ConditionNode({ node }: { node: any }) {
    return <BaseContent id={node.id}>Condition Node</BaseContent>;
}

export default ConditionNode;
