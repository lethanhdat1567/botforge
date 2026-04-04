import { create } from "zustand";

/** Snapshot khớp payload AutoSave sau khi load flow từ server */
export type AutoSavePersistPayload = {
    logicJson: unknown;
    layoutJson: { nodes: unknown[]; edges: unknown[] };
};

type State = {
    flowId: string | null;
    baseline: AutoSavePersistPayload | null;
    setBaseline: (flowId: string, baseline: AutoSavePersistPayload) => void;
    clearBaseline: () => void;
};

export const useAutoSaveBaselineStore = create<State>((set) => ({
    flowId: null,
    baseline: null,
    setBaseline: (flowId, baseline) => set({ flowId, baseline }),
    clearBaseline: () => set({ flowId: null, baseline: null }),
}));
