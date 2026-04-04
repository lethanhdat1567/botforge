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
    const [hydrationReady, setHydrationReady] = useState(false);

    const { handleEndConnect } = useFlowConnect();
    const { handleEdgeChange } = useFlowEdges();

    const openMenu = useContextMenuStore((s) => s.openAt);
    const nodes = useNodeStore((s) => s.nodes);
    const edges = useEdgeStore((s) => s.edges);
    const { variant, color, bgColor } = useBackgroundAdjustStore();

    const onNodesChange = useNodeStore((s) => s.onNodesChange);
    const onConnectStart = useEdgeStore((s) => s.onConnectStart);

    // 🔹 Lifecycle flow
    /* eslint-disable react-hooks/set-state-in-effect -- đồng bộ status/hydration với tải flow + AbortController */
    useEffect(() => {
        if (!flowId) {
            FlowController.resetFlow();
            setStatus("idle");
            setHydrationReady(false);
            return;
        }

        setHydrationReady(false);
        setStatus("loading");

        const ac = new AbortController();

        FlowController.loadFlow(flowId, ac.signal)
            .then(() => {
                if (ac.signal.aborted) return;
                setHydrationReady(true);
                setStatus("ready");
            })
            .catch((error) => {
                console.log(error);
                if (ac.signal.aborted) return;
                setHydrationReady(false);
                setStatus("error");
            });

        return () => ac.abort();
    }, [flowId]);
    /* eslint-enable react-hooks/set-state-in-effect */

    // 🔹 Render theo trạng thái
    if (!flowId) {
        return <EmptyFlow />;
    }

    if (status === "loading") {
        return (
            <div className="flex h-svh min-h-[50dvh] w-full min-w-0 items-center justify-center px-4 text-neutral-500">
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
            className="flow_canvas h-svh min-h-0 w-full min-w-0 flex-1"
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
                    <AutoSave hydrationReady={hydrationReady} />
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
                    className="m-2 flex max-w-[calc(100vw-1rem)] flex-wrap items-center justify-end gap-2 sm:m-0 sm:max-w-none"
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
