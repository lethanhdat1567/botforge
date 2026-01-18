import { Command } from "@/components/FlowCanvas/Commands/Command";
import { NodeRegistryMap } from "@/components/FlowCanvas/Registry";
import { useNodeStore } from "@/store/nodeStore";

export class UpdatePayloadCommand implements Command {
    private oldNode: any;

    constructor(
        private nodeId: string,
        private payloadId: string,
        private patch: any,
    ) {}

    execute() {
        const store = useNodeStore.getState();
        const node = store.nodes.find((n) => n.id === this.nodeId);

        if (!node) return;

        this.oldNode = structuredClone(node);

        const registry = NodeRegistryMap[node.type];

        if (!registry.updatePayload) return;

        const newNode = registry.updatePayload(
            node as any,
            this.payloadId,
            this.patch,
        );

        store.updateNode(this.nodeId, newNode);
    }

    undo() {
        if (!this.oldNode) return;

        useNodeStore.getState().updateNode(this.nodeId, this.oldNode);
    }
}
