import {
    MessageNode,
    MessageDataEngine,
    AttachmentMessageData,
    TextMessageData,
    GenericTemplateData,
    MediaTemplateData,
} from "./message.type";
import { ChildrenMap } from "@/components/FlowCanvas/Flow/Compiler/children-map";
import {
    FlowNode,
    MessageNodeData,
} from "@/components/FlowCanvas/types/node/node.type";

export function compileMessageNode(
    node: FlowNode,
    childrenMap: ChildrenMap,
): MessageNode {
    const data = node.data as MessageNodeData;
    const messages = data.messages ?? [];
    const next = childrenMap[`node-source-${node.id}`];

    const payload = messages
        .map((item): MessageDataEngine | null => {
            const category = "message" as const;

            switch (item.type) {
                case "text":
                    return {
                        category,
                        type: "text",
                        field: {
                            text: item.fields?.text ?? "",
                            ...(item.fields?.buttons?.length
                                ? { buttons: item.fields.buttons }
                                : {}),
                        },
                    } as TextMessageData;

                case "image":
                case "video":
                case "audio":
                    return {
                        category,
                        type: item.type,
                        field: {
                            url: item.fields?.url ?? "",
                        },
                    } as AttachmentMessageData;

                case "generic_template":
                    return {
                        category,
                        type: "generic_template",
                        field: {
                            template_type: "generic",
                            elements: item.fields?.elements ?? [],
                        },
                    } as GenericTemplateData;

                case "media_template":
                    return {
                        category,
                        type: "media_template",
                        field: {
                            attachment_type: item.fields?.media_type ?? "image",
                            url: item.fields?.url ?? "",
                            buttons: item.fields?.buttons ?? [],
                        },
                    } as MediaTemplateData;

                default:
                    return null;
            }
        })
        .filter((item): item is MessageDataEngine => item !== null);

    return {
        id: node.id,
        payload,
        ...(next && { next }),
    };
}
