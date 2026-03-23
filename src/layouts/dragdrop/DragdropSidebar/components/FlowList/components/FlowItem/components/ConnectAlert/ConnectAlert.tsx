import { TriangleAlert } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

function ConnectAlert({ isConnected }: { isConnected: boolean }) {
    if (isConnected) return null;

    return (
        <Tooltip>
            <TooltipTrigger>
                <div className="flex h-6 w-6 items-center justify-center rounded-full border bg-neutral-100">
                    <TriangleAlert size={14} />
                </div>
            </TooltipTrigger>
            <TooltipContent>
                <p>Flow chưa được kết nối với page nào.</p>
            </TooltipContent>
        </Tooltip>
    );
}

export default ConnectAlert;
