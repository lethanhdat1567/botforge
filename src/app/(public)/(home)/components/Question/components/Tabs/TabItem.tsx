"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface TabItemProps {
    question: string;
    answer: string;
}

export default function TabItem({ question, answer }: TabItemProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className="cursor-pointer overflow-hidden rounded-xl bg-neutral-800 p-4"
            onClick={() => setIsOpen(!isOpen)}
        >
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">{question}</h3>
                <Plus
                    size={30}
                    strokeWidth={1}
                    className={`transition-transform duration-300 ${
                        isOpen ? "rotate-45" : "rotate-0"
                    }`}
                />
            </div>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        key="content"
                        initial={{ opacity: 0, maxHeight: 0 }}
                        animate={{ opacity: 1, maxHeight: 200 }}
                        exit={{ opacity: 0, maxHeight: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="text-md mt-4 overflow-hidden text-neutral-400"
                    >
                        <p>{answer}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
