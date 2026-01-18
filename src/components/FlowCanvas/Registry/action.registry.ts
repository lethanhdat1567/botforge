import { v4 as uuid } from "uuid";
import { ActionNodeData } from "@/components/FlowCanvas/types/node/node.type";
import { NodeRegistry } from "@/components/FlowCanvas/types/registry/registry";
import { ActionData } from "@/components/FlowCanvas/types/node/action.type";
import { getDefaultActionData } from "@/components/FlowCanvas/Utils/defaultActionData";

export const ActionRegistry: NodeRegistry<"action", ActionNodeData> = {
    type: "action",
    create(
        messageType: ActionData["type"],
        position: { x: number; y: number },
    ) {
        const defaultAction: ActionData = getDefaultActionData(messageType);

        return {
            id: uuid(),
            type: "action",
            position: position,
            data: {
                label: "Action",
                messages: [defaultAction],
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
        return {
            ...node,
            id: uuid(),
            position: {
                x: node.position.x + 300,
                y: node.position.y,
            },
            selected: false,
            data: {
                ...node.data,
                messages: node.data.messages.map((msg) => {
                    const newMsg = structuredClone(msg);
                    newMsg.id = uuid();

                    if (newMsg.type === "condition") {
                        newMsg.fields.items.map((item) => {
                            return { ...item, id: uuid() };
                        });
                    }

                    return newMsg;
                }),
            },
        };
    },

    duplicatePayload(node, payloadId) {
        return {
            ...node,
            data: {
                ...node.data,
                messages: node.data.messages.flatMap((msg) => {
                    if (msg.id !== payloadId) return [msg];

                    const newMsg = structuredClone(msg);
                    newMsg.id = uuid();

                    if (
                        newMsg.type === "condition" &&
                        Array.isArray(newMsg.fields?.items)
                    ) {
                        newMsg.fields.items = newMsg.fields.items.map(
                            (item) => ({
                                ...item,
                                id: uuid(),
                            }),
                        );
                    }

                    // insert payload mới ngay sau payload cũ
                    return [msg, newMsg];
                }),
            },
        };
    },
    removePayloadNode(data, payloadId) {
        const index = data.actions.findIndex(
            (a: ActionData) => a.id === payloadId,
        );

        if (index === -1) {
            return {
                nextData: data,
                removedPayload: null,
                removedIndex: -1,
            };
        }

        const payload = data.actions[index];

        return {
            nextData: {
                ...data,
                messages: data.actions.filter(
                    (a: ActionData) => a.id !== payloadId,
                ),
            },
            removedPayload: structuredClone(payload),
            removedIndex: index,
        };
    },
};
