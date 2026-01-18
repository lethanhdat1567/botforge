import { FlowController } from "@/components/FlowCanvas/Controller/FlowController";
import BaseContent from "@/components/FlowCanvas/Nodes/BaseContent/BaseContent";
import UploadBtn from "@/components/FlowCanvas/Nodes/Message/components/AttachmentNode/components/UploadBtn/UploadBtn";
import View from "@/components/FlowCanvas/Nodes/Message/components/AttachmentNode/components/View/View";
import { ImageAttachmentData } from "@/components/FlowCanvas/types/node/message.type";
import { uploadService } from "@/services/uploadService";

type Props = {
    nodeId: string;
    payload: ImageAttachmentData;
};

function ImageNode({ nodeId, payload }: Props) {
    const { url } = payload.fields;

    async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            const res = await uploadService.uploadFile(file);
            FlowController.updateNodePayload(nodeId, payload.id, {
                url: res.data.path,
            });
        } catch (error) {
            console.error(error);
        }
    }

    async function handleDestroy() {
        try {
            if (payload.type === "image") {
                await uploadService.deleteFile(url);
                FlowController.updateNodePayload(nodeId, payload.id, {
                    url: "",
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <BaseContent nodeId={nodeId} payloadId={payload.id}>
            {url ? (
                <View
                    type={payload.type as any}
                    src={url}
                    onDestroy={handleDestroy}
                />
            ) : (
                <UploadBtn
                    payloadId={payload.id}
                    attachmentType={payload.type}
                    onUpload={handleUpload}
                />
            )}
        </BaseContent>
    );
}

export default ImageNode;
