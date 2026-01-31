import { create } from "zustand";
import {
    applyEdgeChanges,
    addEdge,
    type Edge,
    type EdgeChange,
    type Connection,
    MarkerType,
} from "@xyflow/react";
import { initialEdges } from "@/components/FlowCanvas/Canvas/initNodeAndEdge";

interface EdgeState {
    edges: Edge[];
    isConnecting: boolean;

    // react-flow
    onEdgesChange: (changes: EdgeChange[]) => void;
    onConnect: (connection: Connection) => void;
    onConnectStart: () => void;
    onConnectEnd: () => void;

    // core
    setEdges: (edges: Edge[]) => void;
    addEdge: (edge: Edge) => void;
    removeEdge: (id: string) => void;
    removeEdgesByNode: (nodeId: string) => void;
    removeEdgeBySourceHandle: (sourceHandle: string) => void;

    resetEdges: () => void;
}

export const useEdgeStore = create<EdgeState>((set, get) => ({
    edges: initialEdges,
    isConnecting: false,

    // React Flow internal
    onEdgesChange: (changes) => {
        set({
            edges: applyEdgeChanges(changes, get().edges),
        });
    },

    // Khi connect node → node
    onConnect: (connection) => {
        const newEdge = {
            ...connection,
            markerEnd: { type: MarkerType.Arrow },
            type: "custom-edge",
        };

        set({
            edges: addEdge(newEdge, get().edges),
            isConnecting: false,
        });
    },

    onConnectStart: () => {
        set({ isConnecting: true });
    },

    onConnectEnd: () => {
        set({ isConnecting: false });
    },

    setEdges: (edges) => set({ edges }),

    addEdge: (edge) =>
        set({
            edges: [...get().edges, edge],
        }),

    removeEdge: (id) =>
        set({
            edges: get().edges.filter((e) => e.id !== id),
        }),

    // ⭐ CỰC KỲ QUAN TRỌNG
    removeEdgesByNode: (nodeId) =>
        set({
            edges: get().edges.filter(
                (e) => e.source !== nodeId && e.target !== nodeId,
            ),
        }),

    removeEdgeBySourceHandle(sourceHandle) {
        set((state) => ({
            edges: state.edges.filter((e) => e.sourceHandle !== sourceHandle),
        }));
    },
    resetEdges: () => set({ edges: initialEdges }),
}));
