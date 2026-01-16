import { FlowNode } from "@/components/FlowCanvas/types/node/node.type";
import { Edge } from "@xyflow/react";

export function validateFlow(nodes: FlowNode[], edges: Edge[]) {
    const nodeIds = new Set(nodes.map((n) => n.id));

    for (const edge of edges) {
        if (!nodeIds.has(edge.source) || !nodeIds.has(edge.target)) {
            throw new Error(`Edge trỏ tới node không tồn tại`);
        }
    }
}
