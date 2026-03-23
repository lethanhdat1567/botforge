"use client";

import {
    ReactFlow,
    Background,
    Controls,
    Panel,
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
import History from "@/components/FlowCanvas/Canvas/components/History/History";
import AutoSave from "@/components/FlowCanvas/Canvas/components/JsonBtns/components/AutoSave/AutoSave";
import { useSearchParams } from "next/navigation";
import EmptyFlow from "@/components/FlowCanvas/Canvas/EmptyFlow";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import BackgroundAdjust from "@/components/FlowCanvas/Canvas/components/BackgroundAdjust/BackgroundAdjust";
import { useBackgroundAdjustStore } from "@/store/backgroundAdjustStore";
import edgeTypes from "@/components/FlowCanvas/Canvas/components/edgeType";
import EdgeMarkers from "@/components/FlowCanvas/Canvas/defs/EdgeMarkers";
import { useFlowConnect } from "@/hooks/useFlowConnect";
import { useFlowEdges } from "@/hooks/useFlowEdges";
import SortLayout from "@/components/FlowCanvas/Canvas/components/SortLayout/SortLayout";

type FlowStatus = "idle" | "loading" | "ready" | "error";

function FlowCanvas() {
    const searchParams = useSearchParams();
    const flowId = searchParams.get("flowId");
    const [status, setStatus] = useState<FlowStatus>("idle");

    const { handleEndConnect } = useFlowConnect();
    const { handleEdgeChange } = useFlowEdges();

    const openMenu = useContextMenuStore((s) => s.openAt);
    const nodes = useNodeStore((s) => s.nodes);
    const edges = useEdgeStore((s) => s.edges);
    const { variant, color, bgColor } = useBackgroundAdjustStore();

    const onNodesChange = useNodeStore((s) => s.onNodesChange);
    const onConnectStart = useEdgeStore((s) => s.onConnectStart);

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
                edgeTypes={edgeTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={handleEdgeChange}
                onConnectStart={onConnectStart}
                onConnectEnd={handleEndConnect}
                connectionMode={ConnectionMode.Strict}
                fitView
            >
                {/* Alert */}
                <Panel position="top-center">
                    <Warning />
                </Panel>
                {/* AutoSave */}
                <Panel position="top-right">
                    <AutoSave />
                </Panel>
                {/* Controls */}
                <Controls position={"center-right"} />
                {/* History and Json */}
                <Panel
                    position="bottom-left"
                    className="bg-background flex items-center gap-4 rounded-sm border p-2"
                >
                    <History />
                    <Separator orientation="vertical" className="h-7!" />
                    <JsonBtns />
                </Panel>
                {/* Background */}
                <Panel
                    position="bottom-right"
                    className="flex items-center gap-2"
                >
                    <BackgroundAdjust />
                    <SortLayout />
                </Panel>

                <Background variant={variant} color={color} bgColor={bgColor} />
                <ContextMenu />
                <EdgeMarkers />
            </ReactFlow>
        </div>
    );
}

export default FlowCanvas;
