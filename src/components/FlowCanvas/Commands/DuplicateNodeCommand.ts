import { Command } from "@/components/FlowCanvas/Commands/Command";
import type { FlowNode } from "../types/node/node.type";
import { useNodeStore } from "@/store/nodeStore";
import { NodeRegistryMap } from "@/components/FlowCanvas/Registry";

export class DuplicateNodeCommand implements Command {
    private newNode!: FlowNode;

    constructor(private sourceNodeId: string) {}

    execute() {
        const nodeStore = useNodeStore.getState();
        const sourceNode = nodeStore.nodes.find(
            (n) => n.id === this.sourceNodeId,
        );

        if (!sourceNode) return;

        const registry = NodeRegistryMap[sourceNode.type];
        this.newNode = registry.duplicate(sourceNode as any);

        nodeStore.addNode(this.newNode);
    }

    undo() {
        if (!this.newNode) return;

        useNodeStore.getState().removeNode(this.newNode.id);
    }
}
