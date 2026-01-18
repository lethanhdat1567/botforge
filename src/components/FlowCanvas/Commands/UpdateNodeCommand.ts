import { Command } from "@/components/FlowCanvas/Commands/Command";
import { NodeRegistryMap } from "@/components/FlowCanvas/Registry";
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
        this.prevData = structuredClone(node);

        // update node
        const registry = NodeRegistryMap[node.type];
        const updateNode = registry.update(node as any, this.patch);

        nodeStore.updateNode(this.nodeId, updateNode);
    }

    undo() {
        useNodeStore.getState().updateNode(this.nodeId, this.prevData);
    }
}
