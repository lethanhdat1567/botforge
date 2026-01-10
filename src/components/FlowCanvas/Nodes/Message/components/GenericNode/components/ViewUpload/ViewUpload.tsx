import View from "@/components/FlowCanvas/Nodes/Message/components/AttachmentNode/components/View/View";
import { Image } from "lucide-react";

type Props = {
    src?: string;
    genericId: string;
    onUpload: (file: File, genericId: string) => void;
    onDestroy: (genericId: string) => void;
};

function ViewUpload({ src, genericId, onUpload, onDestroy }: Props) {
    function handleUpload(e: any) {
        const file = e.target.files?.[0];

        if (file) onUpload(file, genericId);
    }

    return src ? (
        <View src={src} type="image" onDestroy={() => onDestroy(genericId)} />
    ) : (
        <label
            htmlFor={genericId}
            className="flex h-50 w-full cursor-pointer items-center justify-center rounded-sm bg-neutral-100 hover:bg-neutral-200"
        >
            <input
                type="file"
                id={genericId}
                hidden
                accept="image/*"
                onChange={handleUpload}
            />
            <span className="flex items-center justify-center gap-4">
                <Image /> Upload your image
            </span>
        </label>
    );
}

export default ViewUpload;
