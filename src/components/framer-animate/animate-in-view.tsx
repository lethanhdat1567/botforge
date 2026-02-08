"use client";

import {
    animations,
    AnimationType,
} from "@/components/framer-animate/animations";
import { motion, useReducedMotion } from "framer-motion";
import React from "react";

type AnimateInViewProps = {
    animate?: AnimationType;
    delay?: number;
    once?: boolean;
    children: React.ReactNode;
};

export function AnimateInView({
    animate = "fade-up",
    delay = 0,
    children,
}: AnimateInViewProps) {
    const reduceMotion = useReducedMotion();

    if (reduceMotion) {
        return <>{children}</>;
    }

    return (
        <motion.div
            variants={animations[animate]}
            initial="hidden"
            animate="visible"
            transition={{
                delay: 1,
                duration: 0.6,
                ease: "easeOut",
            }}
        >
            {children}
        </motion.div>
    );
}
