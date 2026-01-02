import { v4 as uuid } from "uuid";
import { ActionNodeData } from "@/components/FlowCanvas/types/node/node.type";
import { NodeRegistry } from "@/components/FlowCanvas/types/registry/registry";

export const ActionRegistry: NodeRegistry<"action", ActionNodeData> = {
    type: "action",
    create() {
        return {
            id: uuid(),
            type: "action",
            position: { x: 0, y: 0 },
            data: {
                label: "Action",
                messages: [],
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
