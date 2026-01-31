import { FinalConnectionState, InternalNode, Connection } from "@xyflow/react";
import { FlowController } from "@/components/FlowCanvas/Controller/FlowController";
import { useContextMenuStore } from "@/store/contextMenuStore";

export function useFlowConnect() {
    const openMenu = useContextMenuStore((s) => s.openAt);

    const handleConnect = (connection: Connection) => {
        if (connection.sourceHandle?.startsWith("btn-source-")) {
            FlowController.connectByButtonHandle(connection);
        } else if (connection.sourceHandle?.startsWith("condition-source-")) {
            FlowController.connectByConditionHandle(connection);
        }
    };

    const handleEndConnect = (
        event: any,
        connectionState: FinalConnectionState<InternalNode>,
    ) => {
        if (!connectionState.fromNode || !connectionState.fromHandle) return;

        const targetElement = event.target as HTMLElement | null;
        if (!targetElement) return;

        const nodeEl = targetElement.closest("[data-node-id]");

        if (!nodeEl) {
            openMenu(event.clientX, event.clientY);
            return;
        }

        const targetNodeId = nodeEl.getAttribute("data-node-id");
        if (!targetNodeId) return;

        if (targetNodeId === connectionState.fromNode.id) return;

        FlowController.connect({
            source: connectionState.fromNode.id,
            sourceHandle: connectionState.fromHandle.id as string,
            target: targetNodeId,
            targetHandle: `node-target-${targetNodeId}`,
        });
    };

    return {
        handleConnect,
        handleEndConnect,
    };
}
