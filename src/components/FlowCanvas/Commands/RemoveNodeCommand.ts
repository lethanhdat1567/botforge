import { Command } from "@/components/FlowCanvas/Commands/Command";
import type { FlowNode } from "../types/node/node.type";
import type { Edge } from "@xyflow/react";
import { useNodeStore } from "@/store/nodeStore";
import { useEdgeStore } from "@/store/edgeStore";

export class RemoveNodeCommand implements Command {
    private node?: FlowNode;
    private edges: Edge[] = [];

    constructor(private nodeId: string) {}

    execute() {
        const nodeStore = useNodeStore.getState();
        const edgeStore = useEdgeStore.getState();

        const foundNode = nodeStore.nodes.find((n) => n.id === this.nodeId);
        if (!foundNode) return;

        this.node = foundNode;

        this.edges = edgeStore.edges.filter(
            (e) => e.source === this.nodeId || e.target === this.nodeId,
        );

        nodeStore.removeNode(this.nodeId);
        edgeStore.removeEdgesByNode(this.nodeId);
    }

    undo() {
        if (!this.node) return;

        const nodeStore = useNodeStore.getState();
        const edgeStore = useEdgeStore.getState();

        nodeStore.addNode(this.node);

        edgeStore.setEdges([...edgeStore.edges, ...this.edges]);
    }
}
