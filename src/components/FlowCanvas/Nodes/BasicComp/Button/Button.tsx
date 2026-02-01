"use client";

import ButtonDialog from "@/components/FlowCanvas/Nodes/BasicComp/Button/components/ButtonDialog/ButtonDialog";
import { ButtonNode } from "@/components/FlowCanvas/types/node/button.type";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Trash } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button as ButtonUI } from "@/components/ui/button";
import { Handle, Position } from "@xyflow/react";

type Props = {
    btn: ButtonNode;
    variable?: string;
    onCommit: (btn: ButtonNode) => void;
    onDestroyBtn: (btnId: string) => void;
};

function Button({ btn, onCommit, onDestroyBtn, variable }: Props) {
    const inputRef = useRef<HTMLDivElement>(null);
    const [showTooltip, setShowTooltip] = useState(false);
    const [buttonInput, setButtonInput] = useState(btn.title);

    const isError = !btn.title?.trim();

    // sync khi undo / redo
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setButtonInput(btn.title);
    }, [btn.title]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                inputRef.current &&
                !inputRef.current.contains(event.target as Node)
            ) {
                setShowTooltip(false);
            }
        }

        window.addEventListener("mousedown", handleClickOutside, true);
        return () => {
            window.removeEventListener("mousedown", handleClickOutside, true);
        };
    }, []);

    const handleBlur = () => {
        if (buttonInput === btn.title) return;

        onCommit({
            ...btn,
            title: buttonInput,
        });
    };

    return (
        <div className="group/btn relative rounded-sm bg-white" ref={inputRef}>
            <Input
                className={cn(
                    "w-full ring-0!",
                    isError && "border-red-300 focus:border-red-500!",
                )}
                value={buttonInput}
                onChange={(e) => setButtonInput(e.target.value)}
                onBlur={handleBlur}
                onFocus={() => setShowTooltip(true)}
                placeholder="Nội dung..."
            />

            {btn.type !== "url" && (
                <Handle
                    type="source"
                    position={Position.Right}
                    id={`btn-source-${btn.id}`}
                    className="bg-muted-foreground! hover:bg-foreground! h-2.5! w-2.5! cursor-crosshair rounded-full! border transition-all duration-150 hover:scale-125!"
                />
            )}

            <ButtonDialog
                showTooltip={showTooltip}
                btn={btn}
                onChange={onCommit}
                variable={variable}
            />

            <ButtonUI
                variant={"outline"}
                className="absolute top-0 left-1/2 hidden -translate-x-1/2 -translate-y-full group-hover/btn:block"
                onClick={() => onDestroyBtn(btn.id)}
            >
                <Trash />
            </ButtonUI>
        </div>
    );
}

export default Button;
