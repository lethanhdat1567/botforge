import { create } from "zustand";
import { applyNodeChanges, type NodeChange } from "@xyflow/react";
import {
    FlowNode,
    FlowNodeType,
} from "@/components/FlowCanvas/types/node/node.type";
import { NodeRegistryMap } from "@/components/FlowCanvas/Registry";
import { initialNodes } from "@/components/FlowCanvas/Canvas/initNodeAndEdge";

interface NodeState {
    nodes: FlowNode[];

    // react-flow
    onNodesChange: (changes: NodeChange[]) => void;

    // core actions
    setNodes: (nodes: FlowNode[]) => void;
    addNode: (node: FlowNode) => void;
    updateNode: (id: string, patch: any) => void;
    removeNode: (id: string) => void;

    resetNodes: () => void;
}

export const useNodeStore = create<NodeState>((set, get) => ({
    nodes: initialNodes,

    // React Flow internal changes
    onNodesChange: (changes) => {
        set({
            nodes: applyNodeChanges(changes, get().nodes) as FlowNode[],
        });
    },

    setNodes: (nodes) => set({ nodes }),

    addNode: (node) =>
        set({
            nodes: [...get().nodes, node],
        }),

    // ✅ update đi qua registry (store không biết data shape)
    updateNode: (id, patch) => {
        set({
            nodes: get().nodes.map((node) => {
                if (node.id !== id) return node;

                const registry = NodeRegistryMap[node.type];
                return registry.update(node as any, patch);
            }),
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

    resetNodes: () => set({ nodes: initialNodes }),
}));
