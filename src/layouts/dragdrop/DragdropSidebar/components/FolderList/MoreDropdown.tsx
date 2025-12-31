import AlertDestroyDialog from "@/components/AlertDestroyDialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Ellipsis } from "lucide-react";
import { useState } from "react";

type Props = { onDestroy: any; onRename: any; onDuplicate: any };

function MoreDropdown({ onDestroy, onRename, onDuplicate }: Props) {
    const [isShowAlert, setIsShowAlert] = useState(false);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className="text-muted-foreground hover:text-foreground h-5 w-5 cursor-pointer">
                                <Ellipsis strokeWidth={1.5} size={20} />
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Thêm lựa chọn</p>
                        </TooltipContent>
                    </Tooltip>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={onRename}>
                        Đổi tên
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={onDuplicate}>
                        Nhân bản
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        variant="destructive"
                        onClick={() => setIsShowAlert(true)}
                    >
                        Xóa
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <AlertDestroyDialog
                open={isShowAlert}
                onOpenChange={setIsShowAlert}
                onConfirm={onDestroy}
            />
        </>
    );
}

export default MoreDropdown;
