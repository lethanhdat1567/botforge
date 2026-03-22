import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils"; // Hàm helper mặc định của Shadcn

interface Props {
    status: "active" | "inactive";
}

function StatusBadge({ status }: Props) {
    const isActive = status === "active";

    return (
        <TooltipProvider delayDuration={150}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className="flex cursor-default items-center justify-center p-1">
                        <span className="relative flex h-2.5 w-2.5">
                            {/* Hiệu ứng sóng lan tỏa chỉ dành cho Active */}
                            {isActive && (
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                            )}
                            <span
                                className={cn(
                                    "relative inline-flex h-2.5 w-2.5 rounded-full border border-white dark:border-slate-950",
                                    isActive
                                        ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                                        : "bg-slate-300 dark:bg-slate-700",
                                )}
                            />
                        </span>
                    </div>
                </TooltipTrigger>
                <TooltipContent
                    side="top"
                    className="bg-slate-900 px-2 py-1 text-[10px] font-medium text-slate-50"
                >
                    <p>{isActive ? "Đang hoạt động" : "Đã tạm dừng"}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}

export default StatusBadge;
