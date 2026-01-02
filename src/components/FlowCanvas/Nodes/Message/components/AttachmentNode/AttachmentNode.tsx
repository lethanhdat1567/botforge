import BaseContent from "@/components/FlowCanvas/Nodes/BaseContent/BaseContent";
import { AttachmentMessageData } from "@/components/FlowCanvas/types/node/message.type";

function AttachmentNode({ node }: { node: AttachmentMessageData }) {
    return <BaseContent id={node.id}>Attachment Node</BaseContent>;
}

export default AttachmentNode;
