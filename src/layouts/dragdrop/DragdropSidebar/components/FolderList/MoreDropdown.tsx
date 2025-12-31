import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Ellipsis } from "lucide-react";

function MoreDropdown() {
    return (
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
                <DropdownMenuItem>Đổi tên</DropdownMenuItem>
                <DropdownMenuItem>Nhân bản</DropdownMenuItem>
                <DropdownMenuItem variant="destructive">Xóa</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default MoreDropdown;
