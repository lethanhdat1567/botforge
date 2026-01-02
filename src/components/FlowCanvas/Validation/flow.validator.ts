import type { FlowNode } from "../types/node/node.type";
import type { Edge } from "@xyflow/react";
import type { ValidationError } from "./types";
import { validateNode } from "./node.validator";
import { validateEdges } from "./edge.validator";

export function validateFlow(
    nodes: FlowNode[],
    edges: Edge[],
): ValidationError[] {
    return [...nodes.flatMap(validateNode), ...validateEdges(nodes, edges)];
}
