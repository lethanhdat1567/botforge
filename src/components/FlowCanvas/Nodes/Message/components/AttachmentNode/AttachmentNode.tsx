import BaseContent from "@/components/FlowCanvas/Nodes/BaseContent/BaseContent";
import UploadBtn from "@/components/FlowCanvas/Nodes/Message/components/AttachmentNode/components/UploadBtn/UploadBtn";
import { AttachmentMessageData } from "@/components/FlowCanvas/types/node/message.type";

type Props = {
    nodeId: string;
    payload: AttachmentMessageData;
};

function AttachmentNode({ nodeId, payload }: Props) {
    const { attachmentType, url } = payload.fields;

    function handleUpload(e: any) {
        const file = e.target.files[0];
    }

    return (
        <BaseContent id={nodeId}>
            <UploadBtn
                attachmentType={attachmentType}
                onUpload={handleUpload}
            />
        </BaseContent>
    );
}

export default AttachmentNode;
