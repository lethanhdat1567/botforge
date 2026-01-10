import { filterAttachment } from "@/components/FlowCanvas/Nodes/Message/components/AttachmentNode/components/UploadBtn/helpers";
import { Plus } from "lucide-react";

export type MediaType = "image" | "audio" | "video";
type Props = {
    attachmentType: MediaType | MediaType[];
    onUpload: any;
    payloadId: string;
};

function UploadBtn({ attachmentType, onUpload, payloadId }: Props) {
    return (
        <div className="flex h-10 w-full items-center justify-center">
            <label
                htmlFor={payloadId}
                className="flex w-full items-center justify-center gap-2"
            >
                <Plus size={16} />
                Upload {attachmentType}
            </label>
            <input
                id={payloadId}
                className="hidden"
                type="file"
                accept={filterAttachment(attachmentType)}
                onChange={onUpload}
            />
        </div>
    );
}

export default UploadBtn;
