"use client";

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Redo2, Undo2 } from "lucide-react";
import { useEffect, useCallback } from "react";
import { FlowController } from "@/components/FlowCanvas/Controller/FlowController";

function History() {
    const undo = useCallback(() => {
        FlowController.undo();
    }, []);

    const redo = useCallback(() => {
        FlowController.redo();
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const isUndo =
                (e.key === "z" || e.key === "Z") &&
                (e.ctrlKey || e.metaKey) &&
                !e.shiftKey;

            const isRedo =
                ((e.key === "z" || e.key === "Z") &&
                    (e.ctrlKey || e.metaKey) &&
                    e.shiftKey) ||
                ((e.key === "y" || e.key === "Y") && e.ctrlKey);

            if (isUndo) {
                e.preventDefault();
                undo();
            }

            if (isRedo) {
                e.preventDefault();
                redo();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [undo, redo]);

    return (
        <div className="flex items-center gap-4">
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant="secondary"
                        onClick={undo}
                        aria-label="Undo"
                        disabled={FlowController.undoCount() === 0}
                    >
                        <Undo2 />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Undo</p>
                </TooltipContent>
            </Tooltip>

            <Separator orientation="vertical" className="h-4!" />

            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant="secondary"
                        onClick={redo}
                        aria-label="Redo"
                        disabled={FlowController.redoCount() === 0}
                    >
                        <Redo2 />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Redo</p>
                </TooltipContent>
            </Tooltip>
        </div>
    );
}

export default History;
