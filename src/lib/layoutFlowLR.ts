import dagre from "dagre";
import { Node, Edge } from "@xyflow/react";

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const FALLBACK_WIDTH = 250;
const FALLBACK_HEIGHT = 80;

export function layoutFlowLR<T extends Node>(nodes: T[], edges: Edge[]): T[] {
    dagreGraph.setGraph({
        rankdir: "LR",
        nodesep: 80, // dọc
        ranksep: 180, // ngang
        marginx: 40,
        marginy: 40,
    });

    nodes.forEach((node) => {
        const width = node.measured?.width ?? node.width ?? FALLBACK_WIDTH;

        const height = node.measured?.height ?? node.height ?? FALLBACK_HEIGHT;

        dagreGraph.setNode(node.id, {
            width,
            height,
        });
    });

    edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    return nodes.map((node) => {
        const pos = dagreGraph.node(node.id);

        const width = node.measured?.width ?? node.width ?? FALLBACK_WIDTH;

        const height = node.measured?.height ?? node.height ?? FALLBACK_HEIGHT;

        return {
            ...node,
            position: {
                x: pos.x - width / 2,
                y: pos.y - height / 2,
            },
        };
    });
}
