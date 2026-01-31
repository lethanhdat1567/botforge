import { BaseEdge, EdgeProps, getBezierPath, Position } from "@xyflow/react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { FlowController } from "@/components/FlowCanvas/Controller/FlowController";

export function CustomEdge({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition = Position.Right,
    targetPosition = Position.Left,
    selected,
}: EdgeProps) {
    const [path, labelX, labelY] = getBezierPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
        sourcePosition,
        targetPosition,
    });

    function handleRemoveEdge() {
        FlowController.removeEdge(id);
    }

    return (
        <>
            <BaseEdge
                id={id}
                path={path}
                markerEnd="url(#arrow-right)"
                style={{
                    stroke: selected ? "#3B82F6" : "#CBD5E1",
                    strokeWidth: selected ? 3 : 2,
                    transition: "stroke 0.15s ease, stroke-width 0.15s ease",
                }}
            />

            {selected && (
                <foreignObject
                    width={36}
                    height={36}
                    x={labelX - 18}
                    y={labelY - 18}
                    requiredExtensions="http://www.w3.org/1999/xhtml"
                >
                    <div className="flex h-full w-full items-center justify-center">
                        <Button
                            size="icon"
                            variant="destructive"
                            className="h-7 w-7 rounded-full shadow"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveEdge();
                            }}
                        >
                            <X size={18} />
                        </Button>
                    </div>
                </foreignObject>
            )}
        </>
    );
}
