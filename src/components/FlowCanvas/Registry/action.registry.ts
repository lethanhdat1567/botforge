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
};
