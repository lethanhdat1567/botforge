// FlowController.ts
import { AddNodeCommand } from "@/components/FlowCanvas/Commands/AddNodeCommand";
import { commandManager } from "@/components/FlowCanvas/Commands/CommandManager";
import { ConnectButtonEdge } from "@/components/FlowCanvas/Commands/ConnectButtonEdge";
import { ConnectConditionEdgeCommand } from "@/components/FlowCanvas/Commands/ConnectConditionEdge";
import { ConnectEdgeCommand } from "@/components/FlowCanvas/Commands/ConnectEdgeCommand";
import { DuplicateNodeCommand } from "@/components/FlowCanvas/Commands/DuplicateNodeCommand";
import { DuplicatePayloadCommand } from "@/components/FlowCanvas/Commands/DuplicatePayloadCommand";
import { RemoveEdgeCommand } from "@/components/FlowCanvas/Commands/RemoveEdgeCommand";
import { RemoveNodeCommand } from "@/components/FlowCanvas/Commands/RemoveNodeCommand";
import { RemovePayloadNodeCommand } from "@/components/FlowCanvas/Commands/RemovePayloadNodeCommand";
import { UpdateNodeCommand } from "@/components/FlowCanvas/Commands/UpdateNodeCommand";
import { UpdatePayloadCommand } from "@/components/FlowCanvas/Commands/UpdateNodePayloadCommand";
import { ActionData } from "@/components/FlowCanvas/types/node/action.type";
import { CollectionVariableType } from "@/components/FlowCanvas/types/node/collection.type";
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
            | CollectionVariableType,
        position: { x: number; y: number },
    ) {
        commandManager.execute(new AddNodeCommand(type, messageType, position));
    },

    updateNode(nodeId: string, patch: any) {
        commandManager.execute(new UpdateNodeCommand(nodeId, patch));
    },

    updateNodePayload(nodeId: string, payloadId: string, patch: any) {
        commandManager.execute(
            new UpdatePayloadCommand(nodeId, payloadId, patch),
        );
    },

    duplicateNode(nodeId: string) {
        commandManager.execute(new DuplicateNodeCommand(nodeId));
    },

    duplicatePayload(nodeId: string, payloadId: string) {
        commandManager.execute(new DuplicatePayloadCommand(nodeId, payloadId));
    },

    connect(connection: Connection) {
        commandManager.execute(new ConnectEdgeCommand(connection));
    },

    connectByButtonHandle(connection: Connection) {
        commandManager.execute(new ConnectButtonEdge(connection));
    },

    connectByConditionHandle(connection: Connection) {
        commandManager.execute(new ConnectConditionEdgeCommand(connection));
    },

    resetFlow() {
        useNodeStore.getState().resetNodes();
        useEdgeStore.getState().resetEdges();
    },

    removeNode(nodeId: string) {
        commandManager.execute(new RemoveNodeCommand(nodeId));
    },

    removeEdge(edgeId: string) {
        commandManager.execute(new RemoveEdgeCommand(edgeId));
    },

    removePayloadNode(nodeId: string, payloadId: string) {
        commandManager.execute(new RemovePayloadNodeCommand(nodeId, payloadId));
    },

    removeButtonEdge(btnId: string) {
        const edgeStore = useEdgeStore.getState();
        edgeStore.removeEdgeBySourceHandle(`btn-source-${btnId}`);
    },

    undo() {
        commandManager.undo();
    },

    redo() {
        commandManager.redo();
    },

    undoCount() {
        return commandManager.undoCount;
    },

    redoCount() {
        return commandManager.redoCount;
    },

    // (optional)
    canUndo() {
        return commandManager.canUndo;
    },

    canRedo() {
        return commandManager.canRedo;
    },
};
