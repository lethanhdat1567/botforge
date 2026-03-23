import { Command } from "@/components/FlowCanvas/Commands/Command";
import { NodeRegistryMap } from "@/components/FlowCanvas/Registry";
import { FlowNode } from "@/components/FlowCanvas/types/node/node.type";
import { useEdgeStore } from "@/store/edgeStore";
import { useNodeStore } from "@/store/nodeStore";
import { MarkerType } from "@xyflow/react";
import { v4 as uuid } from "uuid";

export interface ConditionConnectionData {
    sourceNodeId: string;
    targetNodeId: string;
    conditionId: string;
}

export class ConnectConditionEdgeCommand implements Command {
    private backupNode?: FlowNode;
    private addedEdgeId?: string;

    constructor(private data: ConditionConnectionData) {}

    execute(): boolean {
        const { sourceNodeId, targetNodeId, conditionId } = this.data;
        const nodeStore = useNodeStore.getState();

        // 1. Tìm Node nguồn
        const sourceNode = nodeStore.nodes.find((n) => n.id === sourceNodeId);
        if (!sourceNode || !Array.isArray(sourceNode.data?.messages))
            return false;

        // Lưu snapshot để phục vụ Undo
        this.backupNode = structuredClone(sourceNode);

        // 2. Tìm registry để update payload
        // Logic này giả định conditionId chính là payloadId cần update
        const registry = NodeRegistryMap[sourceNode.type];
        if (!registry?.updatePayload) return false;

        // Tiến hành update: Gán node đích (targetNodeId) vào thuộc tính 'next' của condition
        const newNode = registry.updatePayload(sourceNode as any, conditionId, {
            next: targetNodeId,
        });

        console.log(newNode);

        nodeStore.updateNode(sourceNodeId, newNode);

        // 3. Thêm dây nối vào UI
        const edgeStore = useEdgeStore.getState();
        this.addedEdgeId = uuid();

        edgeStore.addEdge({
            id: this.addedEdgeId,
            source: sourceNodeId,
            target: targetNodeId,
            sourceHandle: `condition-source-${conditionId}`,
            type: "custom-edge",
            markerEnd: { type: MarkerType.Arrow },
        });

        return true;
    }

    undo() {
        if (this.backupNode) {
            useNodeStore
                .getState()
                .updateNode(this.backupNode.id, this.backupNode);
        }

        if (this.addedEdgeId) {
            useEdgeStore.getState().removeEdge(this.addedEdgeId);
        }
    }
}
