import { Command } from "@/components/FlowCanvas/Commands/Command";
import { useNodeStore } from "@/store/nodeStore";

export class UpdateNodeCommand implements Command {
    private prevData: any;

    constructor(
        private nodeId: string,
        private patch: any,
    ) {}

    execute() {
        const nodeStore = useNodeStore.getState();
        const node = nodeStore.nodes.find((n) => n.id === this.nodeId);

        if (!node) return;

        // clone data cũ để undo
        this.prevData = structuredClone(node.data);

        nodeStore.updateNode(this.nodeId, this.patch);
    }

    undo() {
        if (!this.prevData) return;

        useNodeStore.getState().updateNode(this.nodeId, this.prevData);
    }
}
