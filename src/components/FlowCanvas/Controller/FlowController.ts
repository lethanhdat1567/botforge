// FlowController.ts
import { AddNodeCommand } from "@/components/FlowCanvas/Commands/AddNodeCommand";
import { commandManager } from "@/components/FlowCanvas/Commands/CommandManager";
import { ConnectEdgeCommand } from "@/components/FlowCanvas/Commands/ConnectEdgeCommand";
import { RemoveNodeCommand } from "@/components/FlowCanvas/Commands/RemoveNodeCommand";
import { UpdateNodeCommand } from "@/components/FlowCanvas/Commands/UpdateNodeCommand";
import { ActionData } from "@/components/FlowCanvas/types/node/action.type";
import { CollectionData } from "@/components/FlowCanvas/types/node/collection.type";
import { MessageData } from "@/components/FlowCanvas/types/node/message.type";
import { FlowNodeType } from "@/components/FlowCanvas/types/node/node.type";
import { useEdgeStore } from "@/store/edgeStore";
import { useNodeStore } from "@/store/nodeStore";
import { Connection } from "@xyflow/react";

export const FlowController = {
    addNode(
        type: FlowNodeType,
        messageType:
            | MessageData["type"]
            | ActionData["type"]
            | CollectionData["type"],
    ) {
        commandManager.execute(new AddNodeCommand(type, messageType));
    },

    updateNode(nodeId: string, patch: any) {
        commandManager.execute(new UpdateNodeCommand(nodeId, patch));
    },

    connect(connection: Connection) {
        commandManager.execute(new ConnectEdgeCommand(connection));
    },

    resetFlow() {
        useNodeStore.getState().resetNodes();
        useEdgeStore.getState().resetEdges();
    },

    removeNode(nodeId: string) {
        commandManager.execute(new RemoveNodeCommand(nodeId));
    },

    undo() {
        commandManager.undo();
    },

    redo() {
        commandManager.redo();
    },
};
