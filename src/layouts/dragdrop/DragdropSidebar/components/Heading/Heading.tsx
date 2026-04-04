import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

import PrivateLogo from "@/components/PrivateLogo";
import { Button } from "@/components/ui/button";
import { PanelLeftClose } from "lucide-react";

function Heading({
    setExpand,
}: {
    setExpand: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    return (
        <div className="flex min-w-0 items-center justify-between gap-2 border-b pb-2">
            <div className="min-w-0 flex-1">
                <PrivateLogo />
            </div>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant={"ghost"}
                        size={"icon-lg"}
                        onClick={() => setExpand(false)}
                    >
                        <PanelLeftClose />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Thu nhỏ</p>
                </TooltipContent>
            </Tooltip>
        </div>
    );
}

export default Heading;
