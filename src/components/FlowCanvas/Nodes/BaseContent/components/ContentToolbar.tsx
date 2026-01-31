"use client";

import { FlowController } from "@/components/FlowCanvas/Controller/FlowController";
import { useHydrated } from "@/hooks/use-hydrated";
import { GripVertical, Plus, Trash } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
    nodeId: string;
    payloadId: string;
    dragListeners?: any;
    dragAttributes?: any;
};

function ContentToolbar({
    nodeId,
    payloadId,
    dragListeners,
    dragAttributes,
}: Props) {
    const hydrated = useHydrated();

    function handleDestroy() {
        FlowController.removePayloadNode(nodeId, payloadId);
    }

    function handleDuplicate() {
        FlowController.duplicatePayload(nodeId, payloadId);
    }

    if (!hydrated) return null;

    return (
        <div className="bg-background absolute top-1/2 -left-3 z-9999 hidden w-10 -translate-x-full -translate-y-1/2 flex-col items-center gap-1 rounded-sm border p-1 shadow-md group-hover:flex">
            {/* DRAG HANDLE */}
            <Tooltip>
                <TooltipTrigger asChild>
                    <button
                        {...dragListeners}
                        {...dragAttributes}
                        className="hover:bg-muted cursor-grab rounded-sm p-2"
                    >
                        <GripVertical size={16} />
                    </button>
                </TooltipTrigger>
                <TooltipContent side="left">
                    <p>Thay đổi vị trí</p>
                </TooltipContent>
            </Tooltip>

            <Tooltip>
                <TooltipTrigger asChild>
                    <button
                        className="cursor-pointer rounded-sm p-2 text-blue-600 hover:bg-blue-50"
                        onClick={handleDuplicate}
                    >
                        <Plus size={16} />
                    </button>
                </TooltipTrigger>
                <TooltipContent side="left">
                    <p>Nhân bản</p>
                </TooltipContent>
            </Tooltip>

            <Tooltip>
                <TooltipTrigger asChild>
                    <button
                        className="cursor-pointer rounded-sm p-2 transition hover:bg-red-100"
                        onClick={handleDestroy}
                    >
                        <Trash color="red" size={16} />
                    </button>
                </TooltipTrigger>
                <TooltipContent side="left">
                    <p>Xóa</p>
                </TooltipContent>
            </Tooltip>
        </div>
    );
}

export default ContentToolbar;
