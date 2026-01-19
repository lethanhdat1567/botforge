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
import { flowService } from "@/services/flowService";
import { useEdgeStore } from "@/store/edgeStore";
import { useNodeStore } from "@/store/nodeStore";
import { Connection } from "@xyflow/react";

export const FlowController = {
    async loadFlow(flowId: string) {
        try {
            this.resetFlow();

            const res = await flowService.getFlowById(flowId);

            if (!res?.data?.layoutJson) {
                throw new Error("FLOW_NOT_FOUND");
            }

            const nodes = res.data.layoutJson.nodes ?? [];
            const edges = res.data.layoutJson.edges ?? [];

            useNodeStore.getState().setNodes(nodes);
            useEdgeStore.getState().setEdges(edges);
        } catch (err) {
            this.resetFlow();
            throw err;
        }
    },

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
