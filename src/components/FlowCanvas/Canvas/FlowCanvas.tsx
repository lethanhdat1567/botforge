"use client";

import {
    ReactFlow,
    Background,
    Controls,
    Panel,
    ConnectionMode,
    Connection,
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
import History from "@/components/FlowCanvas/Canvas/components/History/History";
import AutoSave from "@/components/FlowCanvas/Canvas/components/JsonBtns/components/AutoSave/AutoSave";

function FlowCanvas() {
    const openMenu = useContextMenuStore((s) => s.openAt);
    const nodes = useNodeStore((s) => s.nodes);
    const edges = useEdgeStore((s) => s.edges);

    const onNodesChange = useNodeStore((s) => s.onNodesChange);
    const onEdgesChange = useEdgeStore((s) => s.onEdgesChange);

    const onConnectStart = useEdgeStore((s) => s.onConnectStart);

    const handleConnect = (connection: Connection) => {
        // Check if button handle
        if (connection.sourceHandle?.startsWith("btn-source-")) {
            FlowController.connectByButtonHandle(connection);
        }

        // Check if condition handle
        else if (connection.sourceHandle?.startsWith("condition-source-")) {
            FlowController.connectByConditionHandle(connection);
        } else {
            // Edge connect → có undo
            FlowController.connect(connection);
        }
    };

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
                // onConnectEnd={handleConnectEnd}
                onConnect={handleConnect}
                connectionMode={ConnectionMode.Strict}
                fitView
            >
                <Background />
                <Controls />
                <Panel position="top-center" className="space-y-2">
                    <div className="bg-background flex items-center gap-6 border p-2 shadow">
                        <JsonBtns />
                        <History />
                        <AutoSave />
                    </div>
                    <Warning />
                </Panel>
                <ContextMenu />
            </ReactFlow>
        </div>
    );
}

export default FlowCanvas;
