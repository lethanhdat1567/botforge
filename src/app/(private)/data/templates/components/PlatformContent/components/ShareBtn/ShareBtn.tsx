import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";

function ShareBtn() {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button variant={"outline"}>
                    <Share2 />
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                <p>Chia sẻ mẫu công khai</p>
            </TooltipContent>
        </Tooltip>
    );
}

export default ShareBtn;
