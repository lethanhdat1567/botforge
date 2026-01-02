"use client";

import ButtonSelect from "@/components/FlowCanvas/Nodes/BasicComp/Button/ButtonSelect";
import { useRef, useEffect } from "react";

interface ButtonItemProps {
    index: number;
    openIndex: number | null;
    setOpenIndex: (index: number | null) => void;
}

export default function ButtonItem({
    index,
    openIndex,
    setOpenIndex,
}: ButtonItemProps) {
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const canvas: any = document.querySelector(".react-flow__pane");
        if (!canvas) return;

        const handleClick = (e: MouseEvent) => {
            if (!ref.current) return;

            if (ref.current.contains(e.target as Node)) {
                setOpenIndex(index);
            } else {
                setOpenIndex(null);
            }
        };

        canvas.addEventListener("mousedown", handleClick);
        return () => canvas.removeEventListener("mousedown", handleClick);
    }, [index, setOpenIndex]);

    return (
        <div ref={ref} className="relative mb-2 h-8 w-full">
            <input
                className="bg-background h-full w-full p-2"
                onFocus={() => setOpenIndex(index)}
            />
            <ButtonSelect open={openIndex === index} />
        </div>
    );
}
