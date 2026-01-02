import BaseContent from "@/components/FlowCanvas/Nodes/BaseContent/BaseContent";

function DelayNode({ node }: { node: any }) {
    return <BaseContent id={node.id}>{node.content}</BaseContent>;
}

export default DelayNode;
