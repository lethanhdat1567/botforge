import { v4 as uuid } from "uuid";
import { MessageNodeData } from "@/components/FlowCanvas/types/node/node.type";
import { NodeRegistry } from "@/components/FlowCanvas/types/registry/registry";
import { MessageData } from "@/components/FlowCanvas/types/node/message.type";
import { getDefaultMessage } from "@/components/FlowCanvas/Utils/nodeDefaults";

export const MessageRegistry: NodeRegistry<"message", MessageNodeData> = {
    type: "message",
    create(messageType: MessageData["type"]) {
        const defaultMessage: MessageData = getDefaultMessage(messageType);

        return {
            id: uuid(),
            type: "message",
            position: { x: 0, y: 0 },
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
};
