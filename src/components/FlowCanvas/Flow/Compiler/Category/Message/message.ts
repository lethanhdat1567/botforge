// compiler/category/message/index.ts
import {
    AttachmentMessageData,
    MessageDataEngine,
} from "@/components/FlowCanvas/Flow/Compiler/Category/Message/message.type";
import { ChildrenMap } from "@/components/FlowCanvas/Flow/Compiler/children-map";
import { EngineNode } from "@/components/FlowCanvas/types/engine/node";
import { MessageData } from "@/components/FlowCanvas/types/node/message.type";
import { FlowNode } from "@/components/FlowCanvas/types/node/node.type";

export function compileMessageNode(
    node: FlowNode,
    childrenMap: ChildrenMap,
): EngineNode {
    const messages = (node.data.messages as MessageData[]) ?? [];
    const next = childrenMap[node.id];

    const payload: MessageData[] = messages
        .map((item: any): MessageDataEngine | null => {
            switch (item.type) {
                case "button": {
                    const hasButtons =
                        Array.isArray(item.fields?.buttons) &&
                        item.fields.buttons.length > 0;

                    return {
                        type: hasButtons ? "button" : "text",
                        fields: {
                            text: item.fields?.text ?? "",
                            ...(hasButtons && {
                                buttons: item.fields.buttons,
                            }),
                        },
                    } as any;
                }

                case "image":
                case "video":
                case "audio":
                    return {
                        type: "attachment",
                        fields: {
                            attachmentType: item.type,
                            url: item.fields?.url ?? "",
                        },
                    } satisfies AttachmentMessageData;

                case "generic_template":
                    return {
                        type: "generic_template",
                        fields: {
                            elements: item.fields?.elements ?? [],
                        },
                    };

                case "media_template":
                    return {
                        type: "media_template",
                        fields: {
                            media_type: item.fields?.media_type,
                            media_url: item.fields?.media_url,
                            buttons: item.fields?.buttons ?? [],
                        },
                    };

                default:
                    return null;
            }
        })
        .filter(Boolean) as MessageData[];

    return {
        id: node.id,
        category: "message",
        payload,
        ...(next && { children: { next } }),
    };
}
