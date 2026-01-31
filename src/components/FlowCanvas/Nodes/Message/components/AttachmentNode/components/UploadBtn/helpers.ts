import { MediaType } from "@/components/FlowCanvas/Nodes/Message/components/AttachmentNode/components/UploadBtn/UploadBtn";

export function filterAttachment(type: MediaType | MediaType[]): string {
    const types = Array.isArray(type) ? type : [type];

    const map: Record<MediaType, string> = {
        image: "image/*",
        audio: "audio/*",
        video: "video/*",
    };

    return types.map((t) => map[t]).join(",");
}

export function getAttachmentTypeLabel(type: MediaType): string {
    switch (type) {
        case "image":
            return "ảnh";
        case "audio":
            return "âm thanh";
        case "video":
            return "video";
        default:
            return "";
    }
}
