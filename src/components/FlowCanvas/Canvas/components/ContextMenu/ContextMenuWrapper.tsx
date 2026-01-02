import ContextMenu from "@/components/FlowCanvas/Canvas/components/ContextMenu/components/ContextMenu/ContextMenu";
import { useLayoutEffect, useRef, useState } from "react";

type Position = {
    x: number;
    y: number;
};

function ContextMenuWrapper({ children }: { children?: React.ReactNode }) {
    const [pos, setPos] = useState<Position | null>(null);
    const [adjustedPos, setAdjustedPos] = useState<Position | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (!pos || !menuRef.current) return;

        const rect = menuRef.current.getBoundingClientRect();

        let x = pos.x;
        let y = pos.y;

        // overflow right
        if (x + rect.width > window.innerWidth) {
            x = pos.x - rect.width;
        }

        // overflow bottom
        if (y + rect.height > window.innerHeight) {
            y = pos.y - rect.height;
        }

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setAdjustedPos({ x, y });
    }, [pos]);

    return (
        <div
            className="relative"
            onContextMenu={(e) => {
                e.preventDefault();
                setPos({
                    x: e.clientX,
                    y: e.clientY,
                });
            }}
            onClick={() => setPos(null)}
        >
            {children}

            {pos && (
                <div
                    ref={menuRef}
                    className="fixed z-50"
                    style={{
                        top: adjustedPos?.y ?? pos.y,
                        left: adjustedPos?.x ?? pos.x,
                    }}
                >
                    <ContextMenu />
                </div>
            )}
        </div>
    );
}

export default ContextMenuWrapper;
