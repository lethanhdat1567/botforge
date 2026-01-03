import { Command } from "@/components/FlowCanvas/Commands/Command";
import { useNodeStore } from "@/store/nodeStore";

export class UpdatePayloadCommand implements Command {
    private prevData: any;

    constructor(
        private nodeId: string,
        private payloadId: string,
        private patch: any,
    ) {}

    execute() {
        const store = useNodeStore.getState();
        const node = store.nodes.find((n) => n.id === this.nodeId);
        if (!node) return;

        // this.prevData = structuredClone(node.data);

        store.updateNodePayload(this.nodeId, this.payloadId, this.patch);
    }

    undo() {
        if (!this.prevData) return;

        useNodeStore.getState().updateNode(this.nodeId, this.prevData);
    }
}
