import { create } from "zustand";

type MenuState = {
    viewPos: { x: number; y: number } | null;
    openAt: (x: number, y: number) => void;
    close: () => void;
};

export const useContextMenuStore = create<MenuState>((set) => ({
    viewPos: null,
    openAt: (x, y) => set({ viewPos: { x, y } }),
    close: () => set({ viewPos: null }),
}));
