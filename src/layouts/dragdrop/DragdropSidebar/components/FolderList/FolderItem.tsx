"use client";

import { useState } from "react";
import FlowItem from "@/layouts/dragdrop/DragdropSidebar/components/FolderList/FlowItem";
import Options from "@/layouts/dragdrop/DragdropSidebar/components/FolderList/Options";
import { ChevronRight, Folder } from "lucide-react";
import { cn } from "@/lib/utils";

function FolderItem() {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex w-full flex-col">
            {/* Header */}
            <div
                className="group hover:bg-muted flex h-8 w-full cursor-pointer items-center justify-between rounded-sm px-2 py-5 transition"
                onClick={() => setOpen(!open)}
            >
                {/* LEFT */}
                <div className="flex min-w-0 flex-1 items-center gap-4">
                    <ChevronRight
                        className={cn(
                            "h-4 w-4 shrink-0 transition-transform duration-200",
                            open && "rotate-90",
                        )}
                    />
                    <div className="flex items-center gap-1">
                        <Folder size={16} />
                        <h3 className="truncate text-sm font-medium">
                            Thư Mục Template #1
                        </h3>
                    </div>
                </div>

                {/* RIGHT */}
                <Options />
            </div>

            {/* Content */}
            {open && (
                <div className="pl-8">
                    <FlowItem />
                    <FlowItem />
                    <FlowItem />
                </div>
            )}
        </div>
    );
}

export default FolderItem;
