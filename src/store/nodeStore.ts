import { create } from "zustand";
import { applyNodeChanges, type NodeChange } from "@xyflow/react";
import { FlowNode } from "@/components/FlowCanvas/types/node/node.type";
import { NodeRegistryMap } from "@/components/FlowCanvas/Registry";
import { initialNodes } from "@/components/FlowCanvas/Canvas/initNodeAndEdge";

interface NodeState {
    nodes: FlowNode[];
    isDragging: boolean;

    // react-flow
    onNodesChange: (changes: NodeChange[]) => void;

    // core actions
    setNodes: (nodes: FlowNode[]) => void;
    addNode: (node: FlowNode) => void;
    updateNode: (id: string, patch: any) => void;
    removeNode: (id: string) => void;
    markStartNode: (nodeId: string) => void;

    resetNodes: () => void;
}

export const useNodeStore = create<NodeState>((set, get) => ({
    nodes: initialNodes,
    isDragging: false,

    // React Flow internal changes
    onNodesChange: (changes) => {
        const dragging = changes.some(
            (c) => c.type === "position" && c.dragging === true,
        );

        set({
            nodes: applyNodeChanges(changes, get().nodes) as FlowNode[],
            isDragging: dragging,
        });
    },

    setNodes: (nodes) => set({ nodes }),

    addNode: (node) =>
        set({
            nodes: [...get().nodes, node],
        }),

    updateNode: (id, updatedNode) => {
        set({
            nodes: get().nodes.map((node) =>
                node.id === id ? updatedNode : node,
            ),
        });
    },

    // ✅ delete node (sau này edgeStore hook vào đây)
    removeNode: (id) => {
        const node = get().nodes.find((n) => n.id === id);
        if (node) {
            NodeRegistryMap[node.type]?.onDelete?.(node as any);
        }

        set({
            nodes: get().nodes.filter((n) => n.id !== id),
        });
    },

    markStartNode: (nodeId: string) => {
        set({
            nodes: get().nodes.map((node) => {
                const registry = NodeRegistryMap[node.type];

                if (!registry) return node;

                // node được chọn
                if (node.id === nodeId) {
                    return registry.update(node as any, { markStart: true });
                }

                // các node khác => false
                if (node.data?.markStart) {
                    return registry.update(node as any, { markStart: false });
                }

                return node;
            }),
        });
    },

    resetNodes: () => set({ nodes: initialNodes }),
}));
