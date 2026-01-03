export type MediaType = "image" | "audio" | "video";

export function filterAttachment(type: MediaType): string {
    switch (type) {
        case "image":
            return "image/*";
        case "audio":
            return "audio/*";
        case "video":
            return "video/*";
        default:
            return "";
    }
}
