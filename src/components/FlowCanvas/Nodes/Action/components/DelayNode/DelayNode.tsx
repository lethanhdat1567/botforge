import BaseContent from "@/components/FlowCanvas/Nodes/BaseContent/BaseContent";

function DelayNode({ node }: { node: any }) {
    return <BaseContent id={node.id}>Delay node</BaseContent>;
}

export default DelayNode;
