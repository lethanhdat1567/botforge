"use client";

import { menuData } from "./data";
import ContextMenuItem from "./ContextMenuItem";
import { useReactFlow } from "@xyflow/react";
import { useEffect, useRef, useState } from "react";
import { FlowController } from "@/components/FlowCanvas/Controller/FlowController";

function ContextMenu() {
    const { screenToFlowPosition } = useReactFlow();
    const [viewPost, setViewPost] = useState<{ x: number; y: number } | null>();
    const [flowPos, setFlowPos] = useState<{ x: number; y: number } | null>(
        null,
    );
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleContextMenu(e: MouseEvent) {
            e.preventDefault();
            setViewPost({
                x: e.clientX,
                y: e.clientY,
            });
            const pos = screenToFlowPosition({ x: e.clientX, y: e.clientY });
            setFlowPos(pos);
        }

        function handleClickOutside(e: MouseEvent) {
            if (
                menuRef.current &&
                !menuRef.current.contains(e.target as Node)
            ) {
                setViewPost(null);
            }
        }

        window.addEventListener("contextmenu", handleContextMenu);
        window.addEventListener("mousedown", handleClickOutside, true);
        return () => {
            window.removeEventListener("contextmenu", handleContextMenu);
        };
    }, []);

    function handleSelectNode({
        category,
        type,
    }: {
        category: any;
        type: any;
    }) {
        FlowController.addNode(category, type, flowPos || { x: 0, y: 0 });
        setViewPost(null);
        setFlowPos(null);
    }

    return (
        <div
            className={`${viewPost ? "fixed" : "hidden"} bg-background z-999999 w-70 border shadow`}
            style={{
                left: viewPost?.x,
                top: viewPost?.y,
            }}
            ref={menuRef}
        >
            {menuData.map((item) => (
                <ContextMenuItem
                    key={item.id}
                    item={item}
                    onSelectNode={handleSelectNode}
                />
            ))}
        </div>
    );
}

export default ContextMenu;
