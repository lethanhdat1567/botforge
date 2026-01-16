import { Command } from "@/components/FlowCanvas/Commands/Command";
import { ButtonNode } from "@/components/FlowCanvas/types/node/button.type";
import { useNodeStore } from "@/store/nodeStore";

export class UpdateButtonChildrenCommand implements Command {
    private payloadId?: string;
    private before?: any[];

    constructor(
        private nodeId: string,
        private btnId: string,
        private targetNodeId: string,
    ) {}

    execute(): boolean {
        const store = useNodeStore.getState();
        const node = store.nodes.find((n) => n.id === this.nodeId);
        if (!node || !Array.isArray(node.data?.messages)) return false;

        const payload = node.data.messages.find(
            (m: any) =>
                Array.isArray(m.fields?.buttons) &&
                m.fields.buttons.some((b: any) => b.id === this.btnId),
        );
        if (!payload) return false;

        const buttons = (payload.fields as any).buttons;
        const btn = buttons.find((b: ButtonNode) => b.id === this.btnId);
        if (!btn) return false;

        if (btn.next === this.targetNodeId) return false;

        this.payloadId = payload.id;
        this.before = structuredClone(buttons);

        store.updateNodePayload(this.nodeId, payload.id, {
            buttons: buttons.map((b: ButtonNode) =>
                b.id === this.btnId ? { ...b, next: this.targetNodeId } : b,
            ),
        });

        return true;
    }

    undo() {
        if (!this.before || !this.payloadId) return;

        useNodeStore.getState().updateNodePayload(this.nodeId, this.payloadId, {
            buttons: this.before,
        });
    }
}
