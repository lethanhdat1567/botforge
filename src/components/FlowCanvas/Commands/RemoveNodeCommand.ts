import { Command } from "@/components/FlowCanvas/Commands/Command";
import type { FlowNode } from "../types/node/node.type";
import type { Edge } from "@xyflow/react";
import { useNodeStore } from "@/store/nodeStore";
import { useEdgeStore } from "@/store/edgeStore";
import { uploadService } from "@/services/uploadService";

export class RemoveNodeCommand implements Command {
    private node!: FlowNode;
    private edges: Edge[] = [];

    constructor(private nodeId: string) {}

    execute() {
        const nodeStore = useNodeStore.getState();
        const edgeStore = useEdgeStore.getState();

        this.node = nodeStore.nodes.find((n) => n.id === this.nodeId)!;
        if (
            Array.isArray(this.node.data.messages) &&
            this.node.data.messages.length > 0
        ) {
            this.node.data.messages.forEach((msg) => {
                if (
                    msg.type === "image" ||
                    msg.type === "video" ||
                    msg.type === "audio"
                ) {
                    if (msg.fields.url) {
                        uploadService.deleteFile(msg.fields.url);
                    }
                }
            });
        }
        this.edges = edgeStore.edges.filter(
            (e) => e.source === this.nodeId || e.target === this.nodeId,
        );

        nodeStore.removeNode(this.nodeId);
        edgeStore.removeEdgesByNode(this.nodeId);
    }

    undo() {
        const nodeStore = useNodeStore.getState();
        const edgeStore = useEdgeStore.getState();

        nodeStore.addNode(this.node);
        edgeStore.setEdges([...edgeStore.edges, ...this.edges]);
    }
}
