"use client";

import { menuData } from "./data";
import ContextMenuItem from "./ContextMenuItem";
import { useReactFlow } from "@xyflow/react";
import { useEffect, useMemo, useRef } from "react";
import { FlowController } from "@/components/FlowCanvas/Controller/FlowController";
import { useContextMenuStore } from "@/store/contextMenuStore";

function ContextMenu() {
    const { screenToFlowPosition } = useReactFlow();
    const { viewPos, close } = useContextMenuStore();

    const menuRef = useRef<HTMLDivElement>(null);

    // convert screen -> flow
    // eslint-disable-next-line react-hooks/preserve-manual-memoization
    const flowPos = useMemo(() => {
        if (!viewPos) return null;
        return screenToFlowPosition(viewPos);
    }, [viewPos]);

    // click outside → close
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (
                menuRef.current &&
                !menuRef.current.contains(e.target as Node)
            ) {
                close();
            }
        }

        window.addEventListener("mousedown", handleClickOutside, true);
        return () =>
            window.removeEventListener("mousedown", handleClickOutside, true);
    }, []);

    if (!viewPos) return null;

    function handleSelectNode({
        category,
        type,
    }: {
        category: any;
        type: any;
    }) {
        if (!flowPos) return;
        FlowController.addNode(category, type, flowPos);
        close();
    }

    return (
        <div
            ref={menuRef}
            className="bg-background fixed z-999999 w-70 border shadow"
            style={{
                left: viewPos.x,
                top: viewPos.y,
            }}
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
