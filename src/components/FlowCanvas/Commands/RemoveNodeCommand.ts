import { Command } from "@/components/FlowCanvas/Commands/Command";
import type { FlowNode } from "../types/node/node.type";
import type { Edge } from "@xyflow/react";
import { useNodeStore } from "@/store/nodeStore";
import { useEdgeStore } from "@/store/edgeStore";
import { NodeRegistryMap } from "@/components/FlowCanvas/Registry";

export class RemoveNodeCommand implements Command {
    private node!: FlowNode;
    private edges: Edge[] = [];

    constructor(private nodeId: string) {}

    execute() {
        const nodeStore = useNodeStore.getState();
        const edgeStore = useEdgeStore.getState();

        this.node = nodeStore.nodes.find((n) => n.id === this.nodeId)!;

        const register = NodeRegistryMap[this.node.type];

        if (register.removeNode) {
            register.removeNode(this.node as any);
        }

        nodeStore.removeNode(this.nodeId);
        edgeStore.removeEdgesByNode(this.nodeId);
    }

    undo() {
        const nodeStore = useNodeStore.getState();
        const edgeStore = useEdgeStore.getState();

        nodeStore.addNode(this.node);
        edgeStore.setEdges([...edgeStore.edges, ...this.edges]);
    }
}
