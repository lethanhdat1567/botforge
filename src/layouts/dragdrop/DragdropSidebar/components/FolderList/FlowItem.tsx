import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Activity, Ellipsis } from "lucide-react";

function FlowItem() {
    return (
        <div className="group hover:bg-muted group flex h-8 w-full items-center gap-2 rounded-sm px-2 py-5">
            {/* LEFT */}
            <div className="flex min-w-0 flex-1 items-center gap-2">
                <Activity size={14} className="shrink-0 text-green-500" />

                <h3 className="truncate text-sm font-medium">
                    Thư Mục Template #1
                </h3>
            </div>

            {/* RIGHT */}
            <Tooltip>
                <TooltipTrigger>
                    <div className="text-muted-foreground hover:text-foreground hidden shrink-0 cursor-pointer p-2 group-hover:flex">
                        <Ellipsis size={16} />
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Add to library</p>
                </TooltipContent>
            </Tooltip>
        </div>
    );
}

export default FlowItem;
