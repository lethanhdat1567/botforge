import { v4 as uuid } from "uuid";
import { MessageNodeData } from "@/components/FlowCanvas/types/node/node.type";
import { NodeRegistry } from "@/components/FlowCanvas/types/registry/registry";
import { MessageData } from "@/components/FlowCanvas/types/node/message.type";
import { getDefaultMessageData } from "@/components/FlowCanvas/Utils/defaultMessageData";
import { removeMessageMedia } from "@/components/FlowCanvas/Registry/helpers";

export const MessageRegistry: NodeRegistry<"message", MessageNodeData> = {
    type: "message",
    create(
        messageType: MessageData["type"],
        position: { x: number; y: number },
    ) {
        const defaultMessage: MessageData = getDefaultMessageData(messageType);

        return {
            id: uuid(),
            type: "message",
            position,
            data: {
                label: "Message",
                messages: [defaultMessage],
            },
        };
    },
    update(node, patch) {
        return {
            ...node,
            data: { ...node.data, ...patch },
        };
    },
    updatePayload(node, payloadId, patch) {
        return {
            ...node,
            data: {
                ...node.data,
                messages: node.data.messages.map((msg) =>
                    msg.id === payloadId
                        ? {
                              ...msg,
                              fields: {
                                  ...msg.fields,
                                  ...patch,
                              },
                          }
                        : msg,
                ),
            },
        };
    },

    duplicate(node) {
        const cloned = structuredClone(node);

        cloned.data.messages = cloned.data.messages.map((msg) => {
            const newMsg = structuredClone(msg);

            newMsg.id = uuid();

            // button / media_template
            if (
                (newMsg.type === "button" ||
                    newMsg.type === "media_template") &&
                Array.isArray(newMsg.fields?.buttons)
            ) {
                newMsg.fields.buttons = newMsg.fields.buttons.map((btn) => ({
                    ...btn,
                    id: uuid(),
                }));
            }

            // generic_template
            if (
                newMsg.type === "generic_template" &&
                Array.isArray(newMsg.fields?.elements)
            ) {
                newMsg.fields.elements = newMsg.fields.elements.map((el) => ({
                    ...el,
                    id: uuid(),
                    buttons: Array.isArray(el.buttons)
                        ? el.buttons.map((btn) => ({
                              ...btn,
                              id: uuid(),
                          }))
                        : [],
                }));
            }

            return newMsg;
        });

        return {
            ...cloned,
            id: uuid(),
            position: {
                x: cloned.position.x + 300,
                y: cloned.position.y,
            },
            selected: false,
        };
    },

    duplicatePayload(node, payloadId) {
        return {
            ...node,
            data: {
                ...node.data,
                messages: node.data.messages.flatMap((msg) => {
                    if (msg.id !== payloadId) return [msg];

                    const cloned = structuredClone(msg);
                    cloned.id = uuid();

                    // 1️⃣ button / media_template
                    if (
                        (cloned.type === "button" ||
                            cloned.type === "media_template") &&
                        Array.isArray(cloned.fields?.buttons)
                    ) {
                        cloned.fields.buttons = cloned.fields.buttons.map(
                            (btn) => ({
                                ...btn,
                                id: uuid(),
                            }),
                        );
                    }

                    // 2️⃣ generic_template
                    if (
                        cloned.type === "generic_template" &&
                        Array.isArray(cloned.fields?.elements)
                    ) {
                        cloned.fields.elements = cloned.fields.elements.map(
                            (element) => ({
                                ...element,
                                id: uuid(),
                                buttons: Array.isArray(element.buttons)
                                    ? element.buttons.map((btn) => ({
                                          ...btn,
                                          id: uuid(),
                                      }))
                                    : [],
                            }),
                        );
                    }

                    // insert cloned payload ngay sau payload gốc
                    return [msg, cloned];
                }),
            },
        };
    },

    removeNode(node) {
        const messages = node?.data?.messages;
        if (!Array.isArray(messages)) return;

        messages.forEach(removeMessageMedia);
    },
    removePayloadNode(data, payloadId) {
        const index = data.messages.findIndex(
            (m: MessageData) => m.id === payloadId,
        );

        if (index === -1) {
            return {
                nextData: data,
                removedPayload: null,
                removedIndex: -1,
            };
        }

        const payload = data.messages[index];

        // side-effect
        removeMessageMedia(payload);

        return {
            nextData: {
                ...data,
                messages: data.messages.filter(
                    (m: MessageData) => m.id !== payloadId,
                ),
            },
            removedPayload: structuredClone(payload),
            removedIndex: index,
        };
    },
};
