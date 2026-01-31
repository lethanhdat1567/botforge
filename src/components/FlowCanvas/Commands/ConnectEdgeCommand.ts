import { Command } from "@/components/FlowCanvas/Commands/Command";
import { useEdgeStore } from "@/store/edgeStore";
import { MarkerType, type Connection, type Edge } from "@xyflow/react";

import { v4 as uuid } from "uuid";

export class ConnectEdgeCommand implements Command {
    private edge!: Edge;

    constructor(private connection: Connection) {}

    execute() {
        const edgeStore = useEdgeStore.getState();

        this.edge = {
            id: uuid(),
            ...this.connection,
            markerEnd: { type: MarkerType.Arrow },
            type: "custom-edge",
        };

        edgeStore.addEdge(this.edge);
    }

    undo() {
        useEdgeStore.getState().removeEdge(this.edge.id);
    }
}
