import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

function AddFolderBtn() {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button variant={"ghost"} size={"icon"}>
                    <Plus />
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                <p>Tạo thư mục</p>
            </TooltipContent>
        </Tooltip>
    );
}

export default AddFolderBtn;
