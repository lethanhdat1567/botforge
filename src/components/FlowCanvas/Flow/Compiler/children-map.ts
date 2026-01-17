import { Edge } from "@xyflow/react";

export type ChildrenMap = Record<string, string>;

export function buildChildrenMap(edges: Edge[]): ChildrenMap {
    const map: ChildrenMap = {};

    for (const edge of edges) {
        if (!edge.source || !edge.target || !edge.sourceHandle) continue;

        if (edge.source === edge.target) {
            throw new Error(`Node ${edge.source} không được trỏ tới chính nó`);
        }

        const key = edge.sourceHandle;

        if (map[key]) {
            throw new Error(`Handle ${key} có nhiều hơn 1 children`);
        }

        map[key] = edge.target;
    }

    return map;
}
