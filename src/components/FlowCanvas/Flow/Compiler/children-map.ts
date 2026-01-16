import { Edge } from "@xyflow/react";

export type ChildrenMap = Record<string, string>;

export function buildChildrenMap(edges: Edge[]): ChildrenMap {
    const map: ChildrenMap = {};

    for (const edge of edges) {
        if (edge.source === edge.target) {
            throw new Error(`Node ${edge.source} không được trỏ tới chính nó`);
        }

        if (map[edge.source]) {
            throw new Error(`Node ${edge.source} có nhiều hơn 1 children`);
        }

        map[edge.source] = edge.target;
    }

    return map;
}
