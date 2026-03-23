import { Command } from "@/components/FlowCanvas/Commands/Command";
import type { Edge } from "@xyflow/react";
import { useEdgeStore } from "@/store/edgeStore";

export class RemoveEdgeCommand implements Command {
    private oldEdges: Edge[] = [];

    constructor(private edgeId: string) {}

    execute(): boolean {
        const edgeStore = useEdgeStore.getState();

        this.oldEdges = edgeStore.edges;
        edgeStore.setEdges(edgeStore.edges.filter((e) => e.id !== this.edgeId));

        return true;
    }

    undo() {
        const edgeStore = useEdgeStore.getState();
        edgeStore.setEdges(this.oldEdges);
    }
}
