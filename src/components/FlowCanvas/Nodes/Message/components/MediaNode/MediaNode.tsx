import { FlowController } from "@/components/FlowCanvas/Controller/FlowController";
import BaseContent from "@/components/FlowCanvas/Nodes/BaseContent/BaseContent";
import ButtonList from "@/components/FlowCanvas/Nodes/BasicComp/Button/ButtonList";
import UploadBtn from "@/components/FlowCanvas/Nodes/Message/components/AttachmentNode/components/UploadBtn/UploadBtn";
import View from "@/components/FlowCanvas/Nodes/Message/components/AttachmentNode/components/View/View";
import { MediaTemplateData } from "@/components/FlowCanvas/types/node/message.type";
import { uploadService } from "@/services/uploadService";
import { useState } from "react";

type Props = {
    nodeId: string;
    payload: MediaTemplateData;
};

function MediaNode({ nodeId, payload }: Props) {
    const [errors, setErrors] = useState([]);
    const [srcType, setSrcType] = useState<"image" | "video">("image");
    const { media_url, buttons } = payload.fields;

    async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            const res = await uploadService.uploadFile(file);
            setSrcType(res.data.type);
            FlowController.updateNodePayload(nodeId, payload.id, {
                media_url: res.data.path,
            });
        } catch (error) {
            console.error(error);
        }
    }

    async function handleDestroy() {
        try {
            await uploadService.deleteFile(media_url);
            FlowController.updateNodePayload(nodeId, payload.id, {
                media_url: "",
            });
        } catch (error) {
            console.log(error);
        }
    }

    function handleUpdateBtnList(buttons: any) {
        FlowController.updateNodePayload(nodeId, payload.id, {
            buttons,
        });
    }

    return (
        <BaseContent nodeId={nodeId} payloadId={payload.id} errors={errors}>
            <div className="space-y-4 p-2">
                {media_url ? (
                    <View
                        type={srcType}
                        src={media_url}
                        onDestroy={handleDestroy}
                    />
                ) : (
                    <UploadBtn
                        payloadId={payload.id}
                        attachmentType={["image", "video"]}
                        onUpload={handleUpload}
                    />
                )}

                <ButtonList
                    buttonLists={buttons || []}
                    setButtonList={handleUpdateBtnList}
                    setErrors={setErrors}
                />
            </div>
        </BaseContent>
    );
}

export default MediaNode;
