"use client";

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import MoreDropdown from "@/layouts/dragdrop/DragdropSidebar/components/FolderList/MoreDropdown";
import { Ellipsis, Plus } from "lucide-react";
function Options() {
    return (
        <div
            className="flex shrink-0 items-center gap-2 group-hover:flex"
            onClick={(e) => e.stopPropagation()}
        >
            {/* Add new folder */}
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className="text-muted-foreground hover:text-foreground h-5 w-5 cursor-pointer">
                        <Plus strokeWidth={1.5} size={20} />
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Tạo flow mới</p>
                </TooltipContent>
            </Tooltip>

            <MoreDropdown />
        </div>
    );
}

export default Options;
