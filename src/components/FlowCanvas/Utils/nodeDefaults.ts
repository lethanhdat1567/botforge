import { MessageData } from "@/components/FlowCanvas/types/node/message.type";

export function getDefaultMessage(type: MessageData["type"]): MessageData {
    switch (type) {
        case "text":
            return { type: "text", fields: { text: "" } };
        case "button":
            return { type: "button", fields: { text: "", buttons: [] } };
        case "attachment":
            return {
                type: "attachment",
                fields: { attachmentType: "image", url: "" },
            };
        case "quick_replies":
            return {
                type: "quick_replies",
                fields: { text: "", quickReplies: [] },
            };
        default:
            return { type: "text", fields: { text: "" } };
    }
}
