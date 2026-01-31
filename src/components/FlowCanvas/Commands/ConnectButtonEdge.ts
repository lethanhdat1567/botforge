import { Command } from "@/components/FlowCanvas/Commands/Command";
import { FlowController } from "@/components/FlowCanvas/Controller/FlowController";
import { NodeRegistryMap } from "@/components/FlowCanvas/Registry";
import { FlowNode } from "@/components/FlowCanvas/types/node/node.type";
import { useEdgeStore } from "@/store/edgeStore";
import { useNodeStore } from "@/store/nodeStore";
import { Connection, MarkerType } from "@xyflow/react";
import { v4 as uuid } from "uuid";

export class ConnectButtonEdge implements Command {
    private oldNode?: FlowNode;
    private oldEdge?: any;

    constructor(private connection: Connection) {}

    execute(): boolean {
        if (!this.connection.sourceHandle?.startsWith("btn-source-"))
            return false;

        const btnId = this.connection.sourceHandle.replace("btn-source-", "");
        const nodeId = this.connection.source;
        const targetNodeId = this.connection.target;
        if (!nodeId || !targetNodeId) return false;

        const store = useNodeStore.getState();
        const node = store.nodes.find((n) => n.id === nodeId);
        if (!node || !Array.isArray(node.data?.messages)) return false;

        // ✅ snapshot để undo
        this.oldNode = structuredClone(node);

        const payload = node.data.messages.find(
            (m: any) =>
                Array.isArray(m.fields?.buttons) &&
                m.fields.buttons.some((b: any) => b.id === btnId),
        );
        if (!payload) return false;

        const buttons = (payload.fields as any).buttons;
        const btn = buttons.find((b: any) => b.id === btnId);
        if (!btn || btn.next === targetNodeId) return false;

        // ✅ immutable update
        const newButtons = buttons.map((b: any) =>
            b.id === btnId ? { ...b, next: targetNodeId } : b,
        );

        // Update payload
        const registry = NodeRegistryMap[node.type];
        if (!registry.updatePayload) return false;

        const newNode = registry.updatePayload(node as any, payload.id, {
            buttons: newButtons,
        });
        store.updateNode(nodeId, newNode);

        // Connect edge
        const edgeStore = useEdgeStore.getState();

        this.oldEdge = {
            id: uuid(),
            ...this.connection,
            markerEnd: { type: MarkerType.Arrow },
            type: "custom-edge",
        };

        edgeStore.addEdge(this.oldEdge);

        return true;
    }

    undo() {
        if (!this.oldNode) return;

        useNodeStore.getState().updateNode(this.oldNode.id, this.oldNode);

        if (this.oldEdge) {
            useEdgeStore.getState().removeEdge(this.oldEdge.id);
        }
    }
}
