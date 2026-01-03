import AudioNode from "@/components/FlowCanvas/Nodes/Message/components/AttachmentNode/AudioNode/AudioNode";
import ImageNode from "@/components/FlowCanvas/Nodes/Message/components/AttachmentNode/ImageNode/ImageNode";
import GenericNode from "@/components/FlowCanvas/Nodes/Message/components/GenericNode/GenericNode";
import MediaNode from "@/components/FlowCanvas/Nodes/Message/components/MediaNode/MediaNode";
import TextNode from "@/components/FlowCanvas/Nodes/Message/components/TextNode/TextNode";
import { MessageData } from "@/components/FlowCanvas/types/node/message.type";

type Props = {
    nodeId: string;
    payload: MessageData;
};

function FilterMessageNode({ payload, nodeId }: Props) {
    switch (payload.type) {
        case "button":
            return <TextNode payload={payload} nodeId={nodeId} />;
        case "image":
            return <ImageNode payload={payload} nodeId={nodeId} />;
        // case "video":
        //     return <AttachmentNode payload={payload} nodeId={nodeId} />;
        case "audio":
            return <AudioNode payload={payload} nodeId={nodeId} />;
        case "media_template":
            return <MediaNode payload={payload} nodeId={nodeId} />;
        case "generic_template":
            return <GenericNode payload={payload} nodeId={nodeId} />;
        default:
            return <div>Unknown Node Type</div>;
    }
}

export default FilterMessageNode;
