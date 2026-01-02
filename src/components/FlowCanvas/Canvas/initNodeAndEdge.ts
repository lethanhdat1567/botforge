import ActionNode from "@/components/FlowCanvas/Nodes/Action/ActionNode";
import CollectionNode from "@/components/FlowCanvas/Nodes/Collection/CollectionNode";
import MessageNode from "@/components/FlowCanvas/Nodes/Message/MessageNode";
import { FlowNode } from "@/components/FlowCanvas/types/node/node.type";
import { MarkerType } from "@xyflow/react";

export const nodeTypes = {
    message: MessageNode,
    action: ActionNode,
    collection: CollectionNode,
};

export const initialNodes: FlowNode[] = [
    {
        id: "n1",
        type: "message",
        position: { x: 0, y: 0 },
        data: { payload: [], label: "Node 1" },
    },
    {
        id: "n2",
        type: "action",
        position: { x: 0, y: 100 },
        data: { payload: [], label: "Node 1" },
    },
    {
        id: "n3",
        type: "collection",
        position: { x: 0, y: 200 },
        data: { payload: [], label: "Node 1" },
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
