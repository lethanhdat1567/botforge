import { Command } from "@/components/FlowCanvas/Commands/Command";
import type { Edge } from "@xyflow/react";
import { useEdgeStore } from "@/store/edgeStore";

export class RemoveEdgeCommand implements Command {
    private removedEdges: Edge[] = [];

    constructor(private edgeId: string) {}

    execute(): boolean {
        const edgeStore = useEdgeStore.getState();

        const targetEdge = edgeStore.edges.find((e) => e.id === this.edgeId);
        if (!targetEdge) return false;

        const { source, target } = targetEdge;

        // remove tất cả edge liên quan
        this.removedEdges = edgeStore.edges.filter(
            (e) => e.source === source || e.target === target,
        );

        if (this.removedEdges.length === 0) return false;

        edgeStore.setEdges(
            edgeStore.edges.filter(
                (e) => !this.removedEdges.some((re) => re.id === e.id),
            ),
        );

        return true;
    }

    undo() {
        if (this.removedEdges.length === 0) return;

        const edgeStore = useEdgeStore.getState();
        edgeStore.setEdges([...edgeStore.edges, ...this.removedEdges]);
    }
}
