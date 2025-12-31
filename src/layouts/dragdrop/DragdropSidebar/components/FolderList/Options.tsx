"use client";

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import MoreDropdown from "@/layouts/dragdrop/DragdropSidebar/components/FolderList/MoreDropdown";
import { Plus } from "lucide-react";

type Props = {
    onDestroy: any;
    onRename: any;
    onDuplicate: any;
    onCreateFlow?: any;
};

function Options({ onDestroy, onRename, onDuplicate, onCreateFlow }: Props) {
    return (
        <div
            className="invisible flex shrink-0 items-center gap-2 opacity-0 group-hover:visible group-hover:opacity-100"
            onClick={(e) => e.stopPropagation()}
        >
            {/* Add new folder */}
            {onCreateFlow && (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div
                            className="text-muted-foreground hover:text-foreground h-5 w-5 cursor-pointer"
                            onClick={onCreateFlow}
                        >
                            <Plus strokeWidth={1.5} size={20} />
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Tạo flow mới</p>
                    </TooltipContent>
                </Tooltip>
            )}

            <MoreDropdown
                onDestroy={onDestroy}
                onRename={onRename}
                onDuplicate={onDuplicate}
            />
        </div>
    );
}

export default Options;
