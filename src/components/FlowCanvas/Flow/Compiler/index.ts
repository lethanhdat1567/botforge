import { Edge } from "@xyflow/react";
import { buildChildrenMap } from "./children-map";
import { convertNode } from "./node-converter";
import { validateFlow } from "./validator";
import { EngineNode } from "@/components/FlowCanvas/types/engine/node";
import { FlowNode } from "@/components/FlowCanvas/types/node/node.type";

export function compileFlow(
    nodes: FlowNode[],
    edges: Edge[],
): Record<string, EngineNode> {
    validateFlow(nodes, edges);

    const childrenMap = buildChildrenMap(edges);

    const flow: Record<string, EngineNode> = {};

    for (const node of nodes) {
        const engineNode = convertNode(node, childrenMap);

        flow[node.id] = engineNode;
    }

    return flow;
}
