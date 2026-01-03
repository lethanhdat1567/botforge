import { v4 as uuid } from "uuid";
import { MessageNodeData } from "@/components/FlowCanvas/types/node/node.type";
import { NodeRegistry } from "@/components/FlowCanvas/types/registry/registry";
import { MessageData } from "@/components/FlowCanvas/types/node/message.type";
import { getDefaultMessageData } from "@/components/FlowCanvas/Utils/defaultMessageData";

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
};
