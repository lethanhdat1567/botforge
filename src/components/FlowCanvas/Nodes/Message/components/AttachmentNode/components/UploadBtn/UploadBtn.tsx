import { filterAttachemnt } from "@/components/FlowCanvas/Nodes/Message/components/AttachmentNode/components/UploadBtn/helpers";
import { Plus } from "lucide-react";

type Props = { attachmentType: string; onUpload: any };

function UploadBtn({ attachmentType, onUpload }: Props) {
    return (
        <div className="flex h-10 w-full items-center justify-center">
            <label
                htmlFor="upload"
                className="flex w-full items-center justify-center gap-2"
            >
                <Plus size={16} />
                Upload image
            </label>
            <input
                id="upload"
                className="hidden"
                type="file"
                accept={filterAttachemnt(attachmentType)}
                onChange={onUpload}
            />
        </div>
    );
}

export default UploadBtn;
