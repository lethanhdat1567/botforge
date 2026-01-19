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
import { useSearchParams } from "next/navigation";
import EmptyFlow from "@/components/FlowCanvas/Canvas/EmptyFlow";
import { useEffect, useState } from "react";

type FlowStatus = "idle" | "loading" | "ready" | "error";

function FlowCanvas() {
    const searchParams = useSearchParams();
    const flowId = searchParams.get("flowId");

    const [status, setStatus] = useState<FlowStatus>("idle");

    const openMenu = useContextMenuStore((s) => s.openAt);
    const nodes = useNodeStore((s) => s.nodes);
    const edges = useEdgeStore((s) => s.edges);

    const onNodesChange = useNodeStore((s) => s.onNodesChange);
    const onEdgesChange = useEdgeStore((s) => s.onEdgesChange);
    const onConnectStart = useEdgeStore((s) => s.onConnectStart);

    const handleConnect = (connection: Connection) => {
        if (connection.sourceHandle?.startsWith("btn-source-")) {
            FlowController.connectByButtonHandle(connection);
        } else if (connection.sourceHandle?.startsWith("condition-source-")) {
            FlowController.connectByConditionHandle(connection);
        } else {
            FlowController.connect(connection);
        }
    };

    const handleEdgeChange = (changes: any) => {
        const removedEdges = changes.filter((c: any) => c.type === "remove");

        if (removedEdges.length > 0) {
            removedEdges.forEach((c: any) => {
                FlowController.removeEdge(c.id);
            });
        } else {
            onEdgesChange(changes);
        }
    };

    // 🔹 Lifecycle flow
    useEffect(() => {
        if (!flowId) {
            FlowController.resetFlow();
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setStatus("idle");
            return;
        }

        setStatus("loading");

        FlowController.loadFlow(flowId)
            .then(() => setStatus("ready"))
            .catch(() => setStatus("error"));
    }, [flowId]);

    // 🔹 Render theo trạng thái
    if (!flowId) {
        return <EmptyFlow />;
    }

    if (status === "loading") {
        return (
            <div className="flex h-screen items-center justify-center text-neutral-500">
                Đang tải flow...
            </div>
        );
    }

    if (status === "error") {
        return (
            <EmptyFlow
                title="Không thể tải flow"
                description="Flow không tồn tại hoặc đã xảy ra lỗi khi tải dữ liệu."
            />
        );
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
                onEdgesChange={handleEdgeChange}
                onConnectStart={onConnectStart}
                onConnect={handleConnect}
                connectionMode={ConnectionMode.Strict}
                fitView
            >
                <Background />
                <Controls />
                <Panel position="top-center" className="space-y-2">
                    <div className="bg-background flex items-center gap-6 rounded-sm border p-2 shadow">
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
