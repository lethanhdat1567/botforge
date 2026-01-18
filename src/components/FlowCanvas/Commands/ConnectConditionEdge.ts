import { Command } from "@/components/FlowCanvas/Commands/Command";
import { NodeRegistryMap } from "@/components/FlowCanvas/Registry";
import { FlowNode } from "@/components/FlowCanvas/types/node/node.type";
import { useEdgeStore } from "@/store/edgeStore";
import { useNodeStore } from "@/store/nodeStore";
import { Connection, MarkerType } from "@xyflow/react";
import { v4 as uuid } from "uuid";

export class ConnectConditionEdgeCommand implements Command {
    private oldNode?: FlowNode;
    private oldEdge?: any;

    constructor(private connection: Connection) {}

    execute(): boolean {
        if (!this.connection.sourceHandle?.startsWith("condition-source-"))
            return false;

        const payloadId = this.connection.sourceHandle.replace(
            "condition-source-",
            "",
        );
        const nodeId = this.connection.source;
        const targetNodeId = this.connection.target;
        if (!nodeId || !targetNodeId) return false;

        const store = useNodeStore.getState();
        const node = store.nodes.find((n) => n.id === nodeId);
        if (!node || !Array.isArray(node.data?.messages)) return false;

        // ✅ snapshot để undo
        this.oldNode = structuredClone(node);

        // tìm payload chứa condition

        // ✅ immutable update

        const registry = NodeRegistryMap[node.type];
        if (!registry.updatePayload) return false;

        const newNode = registry.updatePayload(node as any, payloadId, {
            next: targetNodeId,
        });
        store.updateNode(nodeId, newNode);

        this.oldEdge = {
            id: uuid(),
            ...this.connection,
            markerEnd: { type: MarkerType.Arrow },
        };

        useEdgeStore.getState().addEdge(this.oldEdge);

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
