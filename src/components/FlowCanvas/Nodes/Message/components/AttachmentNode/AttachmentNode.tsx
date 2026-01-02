import BaseContent from "@/components/FlowCanvas/Nodes/BaseContent/BaseContent";

function AttachmentNode({ node }: { node: any }) {
    return <BaseContent id={node.id}>{node.content}</BaseContent>;
}

export default AttachmentNode;
