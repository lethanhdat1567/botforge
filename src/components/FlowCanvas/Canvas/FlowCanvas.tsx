"use client";

import {
    ReactFlow,
    Background,
    Controls,
    Panel,
    FinalConnectionState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useNodeStore } from "@/store/nodeStore";
import { useEdgeStore } from "@/store/edgeStore";
import JsonBtns from "@/components/FlowCanvas/Canvas/components/JsonBtns/JsonBtns";
import ContextMenu from "@/components/FlowCanvas/Canvas/components/ContextMenu/ContextMenu";
import { nodeTypes } from "@/components/FlowCanvas/Canvas/components/nodeType";
import Warning from "@/components/FlowCanvas/Canvas/components/Warning/Warning";
import { useContextMenuStore } from "@/store/contextMenuStore";

function FlowCanvas() {
    const openMenu = useContextMenuStore((s) => s.openAt);
    const nodes = useNodeStore((s) => s.nodes);
    const edges = useEdgeStore((s) => s.edges);

    const onNodesChange = useNodeStore((s) => s.onNodesChange);
    const onEdgesChange = useEdgeStore((s) => s.onEdgesChange);
    const onConnect = useEdgeStore((s) => s.onConnect);

    function handleConnectEnd(
        event: MouseEvent | TouchEvent,
        connectionState: FinalConnectionState,
    ) {
        if (connectionState.toNode) return;

        const e = event as MouseEvent;
        openMenu(e.clientX, e.clientY);
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
                onConnectEnd={handleConnectEnd}
                onConnect={onConnect}
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
