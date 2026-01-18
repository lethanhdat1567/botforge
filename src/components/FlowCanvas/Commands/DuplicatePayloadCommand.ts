import { Command } from "@/components/FlowCanvas/Commands/Command";
import { useNodeStore } from "@/store/nodeStore";
import { NodeRegistryMap } from "@/components/FlowCanvas/Registry";
import type { FlowNode } from "@/components/FlowCanvas/types/node/node.type";

export class DuplicatePayloadCommand implements Command {
    private prevNode!: FlowNode;
    private nextNode!: FlowNode;

    constructor(
        private nodeId: string,
        private payloadId: string,
    ) {}

    execute() {
        const nodeStore = useNodeStore.getState();
        const node = nodeStore.nodes.find((n) => n.id === this.nodeId);
        if (!node) return;

        const registry = NodeRegistryMap[node.type];
        if (!registry.duplicatePayload) return;

        // lưu state cũ để undo
        this.prevNode = structuredClone(node);

        // registry xử lý duplicate payload
        this.nextNode = registry.duplicatePayload(node as any, this.payloadId);

        nodeStore.updateNode(this.nodeId, this.nextNode);
    }

    undo() {
        if (!this.prevNode) return;
        useNodeStore.getState().updateNode(this.nodeId, this.prevNode);
    }
}
