import AttachmentNode from "@/components/FlowCanvas/Nodes/Message/components/AttachmentNode/AttachmentNode";
import ButtonNode from "@/components/FlowCanvas/Nodes/Message/components/ButtonNode/ButtonNode";
import GenericNode from "@/components/FlowCanvas/Nodes/Message/components/GenericNode/GenericNode";
import MediaNode from "@/components/FlowCanvas/Nodes/Message/components/MediaNode/MediaNode";
import TextNode from "@/components/FlowCanvas/Nodes/Message/components/TextNode/TextNode";
import { MessageData } from "@/components/FlowCanvas/types/node/message.type";

type Props = {
    node: MessageData;
};

function FilterMessageNode({ node }: Props) {
    switch (node.type) {
        case "text":
            return <TextNode node={node} />;
        case "button":
            return <ButtonNode node={node} />;
        case "attachment":
            return <AttachmentNode node={node} />;
        case "media_template":
            return <MediaNode node={node} />;
        case "generic_template":
            return <GenericNode node={node} />;
        default:
            return <div>Unknown Node Type</div>;
    }
}

export default FilterMessageNode;
