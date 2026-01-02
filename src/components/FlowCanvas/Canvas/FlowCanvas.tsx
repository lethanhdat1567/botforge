"use client";

import { ReactFlow, Background, Controls, Panel } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { nodeTypes } from "@/components/FlowCanvas/Canvas/initNodeAndEdge";
import ContextMenuWrapper from "@/components/FlowCanvas/Canvas/components/ContextMenu/ContextMenuWrapper";
import { useNodeStore } from "@/store/nodeStore";
import { useEdgeStore } from "@/store/edgeStore";
import JsonBtns from "@/components/FlowCanvas/Canvas/components/JsonBtns/JsonBtns";

function FlowCanvas() {
    const nodes = useNodeStore((s) => s.nodes);
    const edges = useEdgeStore((s) => s.edges);

    const onNodesChange = useNodeStore((s) => s.onNodesChange);
    const onEdgesChange = useEdgeStore((s) => s.onEdgesChange);
    const onConnect = useEdgeStore((s) => s.onConnect);

    return (
        <ContextMenuWrapper>
            <div className="flow_canvas h-screen w-full">
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    nodeTypes={nodeTypes}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    fitView
                >
                    <Background />
                    <Controls />
                    <Panel position="top-center">
                        <JsonBtns />
                    </Panel>
                </ReactFlow>
            </div>
        </ContextMenuWrapper>
    );
}

export default FlowCanvas;
