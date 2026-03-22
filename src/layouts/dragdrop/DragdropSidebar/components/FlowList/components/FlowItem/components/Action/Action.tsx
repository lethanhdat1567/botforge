import { Button } from "@/components/ui/button";
import { EllipsisIcon } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import AlertDestroyDialog from "@/components/AlertDestroyDialog";

type Props = {
    onDestroy: () => void;
    onDuplicate: () => void;
    onRename: () => void;
    onChangeStatus: () => void;
};

function Action({ onDestroy, onDuplicate, onRename, onChangeStatus }: Props) {
    const [destroyAlert, setDestroyAlert] = useState(false);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={"ghost"} size={"icon-sm"}>
                        <EllipsisIcon />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuGroup>
                        <DropdownMenuItem>Kết nối page</DropdownMenuItem>
                        <DropdownMenuItem onClick={onChangeStatus}>
                            Đổi trạng thái
                        </DropdownMenuItem>
                        <Separator />
                        <DropdownMenuItem onMouseDown={onRename}>
                            Đổi tên
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={onDuplicate}>
                            Nhân bản
                        </DropdownMenuItem>
                        <Separator />
                        <DropdownMenuItem
                            variant="destructive"
                            onClick={() => setDestroyAlert(true)}
                        >
                            Xóa
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
            <AlertDestroyDialog
                itemName={`flow`}
                open={destroyAlert}
                onOpenChange={setDestroyAlert}
                onConfirm={onDestroy}
            />
        </>
    );
}

export default Action;
