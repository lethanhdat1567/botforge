import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { FolderPlus, Plus } from "lucide-react";

function AddFolderBtn({ onCreateFolder }: { onCreateFolder: any }) {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    variant={"outline"}
                    size={"icon-sm"}
                    onClick={(e) => {
                        e.stopPropagation();
                        onCreateFolder();
                    }}
                >
                    <FolderPlus />
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                <p>Tạo thư mục</p>
            </TooltipContent>
        </Tooltip>
    );
}

export default AddFolderBtn;
