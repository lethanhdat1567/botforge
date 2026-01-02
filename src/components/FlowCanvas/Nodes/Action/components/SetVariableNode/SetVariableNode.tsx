import BaseContent from "@/components/FlowCanvas/Nodes/BaseContent/BaseContent";

function SetVariableNode({ node }: { node: any }) {
    return <BaseContent id={node.id}>Variable node</BaseContent>;
}

export default SetVariableNode;
