import { Command } from "@/components/FlowCanvas/Commands/Command";
import { ActionData } from "@/components/FlowCanvas/types/node/action.type";
import { useNodeStore } from "@/store/nodeStore";

export class UpdateConditionNextCommand implements Command {
    private before?: string;

    constructor(
        private nodeId: string,
        private conditionId: string,
        private targetNodeId: string,
    ) {}

    execute(): boolean {
        const store = useNodeStore.getState();
        const node = store.nodes.find((n) => n.id === this.nodeId);
        if (!node || !Array.isArray(node.data?.messages)) return false;

        const payload: any = node.data.messages.find(
            (m: any) => m.id === this.conditionId && m.type === "condition",
        );

        if (!payload) return false;

        const currentNext = payload.fields?.next;

        if (currentNext === this.targetNodeId) return false;

        this.before = currentNext;

        store.updateNodePayload(this.nodeId, this.conditionId, {
            next: this.targetNodeId,
        });

        return true;
    }

    undo() {
        if (this.before === undefined) return;

        useNodeStore
            .getState()
            .updateNodePayload(this.nodeId, this.conditionId, {
                next: this.before,
            });
    }
}
