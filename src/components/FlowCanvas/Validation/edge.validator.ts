import type { Edge } from "@xyflow/react";
import type { FlowNode } from "../types/node/node.type";
import type { ValidationError } from "./types";

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
