import { BackgroundVariant } from "@xyflow/react";
import { create } from "zustand";

type BackgroundAdjustState = {
    variant: BackgroundVariant;
    color: string;
    bgColor: string;

    setVariant: (variant: BackgroundVariant) => void;
    setColor: (color: string) => void;
    setBgColor: (bgColor: string) => void;

    reset: () => void;
};

const DEFAULT_STATE = {
    variant: BackgroundVariant.Dots,
    color: "#000",
    bgColor: "#fff",
};

export const useBackgroundAdjustStore = create<BackgroundAdjustState>(
    (set) => ({
        ...DEFAULT_STATE,

        setVariant: (variant) => set({ variant }),
        setColor: (color) => set({ color }),
        setBgColor: (bgColor) => set({ bgColor }),

        reset: () => set(DEFAULT_STATE),
    }),
);
