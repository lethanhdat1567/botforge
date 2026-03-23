import { ButtonNode } from "@/components/FlowCanvas/types/node/button.type";
import {
    MessageData,
    GenericTemplateElement,
} from "@/components/FlowCanvas/types/node/message.type";
import { v4 as uuid } from "uuid";

export function getDefaultMessageData(type: MessageData["type"]): MessageData {
    const id = uuid();

    switch (type) {
        case "text":
            return {
                id,
                type: "text",
                fields: { text: "", buttons: [] as ButtonNode[] },
            };
        case "image":
            return {
                id,
                type: "image",
                fields: {
                    url: "",
                },
            };
        case "audio":
            return {
                id,
                type: "audio",
                fields: {
                    url: "",
                },
            };
        case "video":
            return {
                id,
                type: "video",
                fields: {
                    url: "",
                },
            };
        case "generic_template":
            return {
                id,
                type: "generic_template",
                fields: {
                    elements: [
                        {
                            id: uuid(),
                            title: "",
                            subtitle: "",
                            image_url: "",
                            default_action: {
                                type: "web_url",
                                url: "",
                            },
                            buttons: [],
                        } as GenericTemplateElement,
                    ],
                },
            };

        case "media_template":
            return {
                id,
                type: "media_template",
                fields: {
                    media_type: "image",
                    url: "",
                    buttons: [] as ButtonNode[],
                },
            };

        default:
            return { id, type: "text", fields: { text: "", buttons: [] } };
    }
}
