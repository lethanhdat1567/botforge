import { Variants } from "framer-motion";

export const animations = {
    "fade-up": {
        hidden: { opacity: 0, y: 24 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    },

    "fade-down": {
        hidden: { opacity: 0, y: -24 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    },

    "fade-left": {
        hidden: { opacity: 0, x: -32 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    },

    "fade-right": {
        hidden: { opacity: 0, x: 32 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    },

    scale: {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.5, ease: "easeOut" },
        },
    },

    blur: {
        hidden: { opacity: 0, filter: "blur(8px)" },
        visible: {
            opacity: 1,
            filter: "blur(0px)",
            transition: { duration: 0.6 },
        },
    },
} satisfies Record<string, Variants>;

export type AnimationType = keyof typeof animations;
