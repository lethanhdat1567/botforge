// FlowController.ts
import { AddNodeCommand } from "@/components/FlowCanvas/Commands/AddNodeCommand";
import { commandManager } from "@/components/FlowCanvas/Commands/CommandManager";
import {
    ButtonConnectionData,
    ConnectButtonEdge,
} from "@/components/FlowCanvas/Commands/ConnectButtonEdge";
import {
    ConditionConnectionData,
    ConnectConditionEdgeCommand,
} from "@/components/FlowCanvas/Commands/ConnectConditionEdge";
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
import { useAutoSaveBaselineStore } from "@/store/autoSaveBaselineStore";
import { useEdgeStore } from "@/store/edgeStore";
import { useNodeStore } from "@/store/nodeStore";
import { Connection } from "@xyflow/react";

function isAbortError(err: unknown): boolean {
    if (err instanceof DOMException && err.name === "AbortError") return true;
    return (
        typeof err === "object" &&
        err !== null &&
        (err as { name?: string }).name === "AbortError"
    );
}

export const FlowController = {
    async loadFlow(flowId: string, signal?: AbortSignal) {
        try {
            this.resetFlow();

            const res = await flowService.getFlowDetail(flowId, { signal });

            if (signal?.aborted) {
                return;
            }

            if (res.data == null) {
                throw new Error("FLOW_NOT_FOUND");
            }

            const rawLayout = res.data.layoutJson;
            const layout =
                rawLayout &&
                typeof rawLayout === "object" &&
                !Array.isArray(rawLayout)
                    ? rawLayout
                    : { nodes: [], edges: [] };
            const nodes = layout.nodes ?? [];
            const edges = layout.edges ?? [];

            useNodeStore.getState().setNodes(nodes);
            useEdgeStore.getState().setEdges(edges);

            const apiStartId = res.data.startNodeId as string | null | undefined;
            if (
                apiStartId &&
                nodes.some(
                    (n: { id?: string }) => n.id === apiStartId,
                )
            ) {
                useNodeStore.getState().markStartNode(apiStartId);
            } else {
                const marked = nodes.find(
                    (n: { id?: string; data?: { markStart?: boolean } }) =>
                        n.data?.markStart === true && n.id,
                );
                if (marked?.id) {
                    useNodeStore.getState().markStartNode(marked.id);
                }
            }

            const nodesForBaseline = useNodeStore.getState().nodes;
            useAutoSaveBaselineStore.getState().setBaseline(flowId, {
                logicJson: res.data.logicJson ?? {},
                layoutJson: { nodes: nodesForBaseline, edges },
            });
        } catch (err) {
            if (signal?.aborted || isAbortError(err)) {
                return;
            }
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

    connectByButtonHandle(data: ButtonConnectionData) {
        commandManager.execute(new ConnectButtonEdge(data));
    },

    connectByConditionHandle(data: ConditionConnectionData) {
        commandManager.execute(new ConnectConditionEdgeCommand(data));
    },

    resetFlow() {
        useAutoSaveBaselineStore.getState().clearBaseline();
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
