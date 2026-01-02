import { FlowNode } from "@/components/FlowCanvas/types/node/node.type";
import { ValidationError } from "@/components/FlowCanvas/Validation/types";
import type { Edge } from "@xyflow/react";

export function validateEdges(
    nodes: FlowNode[],
    edges: Edge[],
): ValidationError[] {
    const errors: ValidationError[] = [];

    edges.forEach((edge) => {
        const source = nodes.find((n) => n.id === edge.source);
        const target = nodes.find((n) => n.id === edge.target);

        if (!source || !target) {
            errors.push({
                level: "error",
                message: "Edge trỏ tới node không tồn tại",
                edgeId: edge.id,
            });
        }
    });

    return errors;
}
