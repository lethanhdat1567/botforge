import { Command } from "@/components/FlowCanvas/Commands/Command";
import { useEdgeStore } from "@/store/edgeStore";
import type { Connection, Edge } from "@xyflow/react";

export class ConnectEdgeCommand implements Command {
    private edge?: Edge;

    constructor(private connection: Connection) {}

    execute() {
        const edgeStore = useEdgeStore.getState();

        const before = edgeStore.edges;
        edgeStore.onConnect(this.connection);

        // lấy edge vừa được tạo
        this.edge = edgeStore.edges.find((e) => !before.includes(e));
    }

    undo() {
        if (!this.edge) return;

        useEdgeStore.getState().removeEdge(this.edge.id);
    }
}
