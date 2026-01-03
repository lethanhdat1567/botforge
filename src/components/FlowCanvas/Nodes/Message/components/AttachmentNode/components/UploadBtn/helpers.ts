export function filterAttachemnt(attachmentType: string) {
    if (attachmentType === "image") return "image/*";
    if (attachmentType === "video") return "video/*";
    if (attachmentType === "audio") return "audio/*";
}
