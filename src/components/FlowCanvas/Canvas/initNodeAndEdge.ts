import MessageNode from "@/components/FlowCanvas/Nodes/Message/MessageNode";
import { MarkerType } from "@xyflow/react";

export const nodeTypes = {
    message: MessageNode,
};

export const initialNodes = [
    {
        id: "n1",
        type: "message",
        position: { x: 0, y: 0 },
        data: { label: "Node 1", messageType: "Message Node" },
    },
    {
        id: "n2",
        type: "message",
        position: { x: 0, y: 100 },
        data: { label: "Node 2", messageType: "Message Node" },
    },
];
export const initialEdges = [
    {
        id: "n1-n2",
        source: "n1",
        target: "n2",
        markerEnd: {
            type: MarkerType.Arrow,
        },
    },
];
