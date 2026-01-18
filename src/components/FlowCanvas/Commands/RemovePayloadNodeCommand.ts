import { Command } from "@/components/FlowCanvas/Commands/Command";
import { NodeRegistryMap } from "@/components/FlowCanvas/Registry";
import { useNodeStore } from "@/store/nodeStore";

export class RemovePayloadNodeCommand implements Command {
    private nodeId: string;
    private payloadId: string;

    private removedPayload: any = null;
    private payloadIndex = -1;

    constructor(nodeId: string, payloadId: string) {
        this.nodeId = nodeId;
        this.payloadId = payloadId;
    }

    execute() {
        const store = useNodeStore.getState();
        const node = store.nodes.find((n) => n.id === this.nodeId);
        if (!node) return;

        const registry = NodeRegistryMap[node.type];
        if (!registry?.removePayloadNode) return;

        const { nextData, removedPayload, removedIndex } =
            registry.removePayloadNode(node.data, this.payloadId);

        if (!removedPayload) return;

        this.removedPayload = removedPayload;
        this.payloadIndex = removedIndex;

        store.updateNode(this.nodeId, {
            ...node,
            data: nextData,
        });
    }

    undo() {
        if (!this.removedPayload || this.payloadIndex === -1) return;

        const store = useNodeStore.getState();
        const node = store.nodes.find((n) => n.id === this.nodeId);
        if (!node) return;
    }
}
