"use client";

import {
    ReactFlow,
    Background,
    Controls,
    Panel,
    FinalConnectionState,
    ConnectionMode,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useNodeStore } from "@/store/nodeStore";
import { useEdgeStore } from "@/store/edgeStore";
import JsonBtns from "@/components/FlowCanvas/Canvas/components/JsonBtns/JsonBtns";
import ContextMenu from "@/components/FlowCanvas/Canvas/components/ContextMenu/ContextMenu";
import { nodeTypes } from "@/components/FlowCanvas/Canvas/components/nodeType";
import Warning from "@/components/FlowCanvas/Canvas/components/Warning/Warning";
import { useContextMenuStore } from "@/store/contextMenuStore";
import { FlowController } from "@/components/FlowCanvas/Controller/FlowController";

function FlowCanvas() {
    const openMenu = useContextMenuStore((s) => s.openAt);
    const nodes = useNodeStore((s) => s.nodes);
    const edges = useEdgeStore((s) => s.edges);

    const onNodesChange = useNodeStore((s) => s.onNodesChange);
    const onEdgesChange = useEdgeStore((s) => s.onEdgesChange);
    const onConnect = useEdgeStore((s) => s.onConnect);

    const onConnectStart = useEdgeStore((s) => s.onConnectStart);
    const onConnectEnd = useEdgeStore((s) => s.onConnectEnd);

    function handleConnectEnd(
        event: MouseEvent | TouchEvent,
        connectionState: FinalConnectionState,
    ) {
        onConnectEnd();
        const nodeEl = (event.target as HTMLElement).closest("[data-node-id]");

        if (nodeEl) {
            const fromHandle = connectionState.fromHandle;

            if (fromHandle?.id?.startsWith("btn-source")) {
                const sourceNode = connectionState.fromNode;
                const targetNode = connectionState.toNode;
                if (!sourceNode || !targetNode) return;

                const btnId = fromHandle.id.replace("btn-source-", "");

                FlowController.updateButtonChildren(
                    sourceNode.id,
                    btnId,
                    targetNode.id,
                );
            }
        } else {
            const e = event as MouseEvent;
            openMenu(e.clientX, e.clientY);
        }
    }

    return (
        <div
            className="flow_canvas h-screen w-full"
            onContextMenu={(e) => {
                e.preventDefault();
                openMenu(e.clientX, e.clientY);
            }}
        >
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnectStart={onConnectStart}
                onConnectEnd={handleConnectEnd}
                onConnect={onConnect}
                connectionMode={ConnectionMode.Strict}
                fitView
            >
                <Background />
                <Controls />
                <Panel position="top-center" className="space-y-2">
                    <JsonBtns />
                    <Warning />
                </Panel>
                <ContextMenu />
            </ReactFlow>
        </div>
    );
}

export default FlowCanvas;
