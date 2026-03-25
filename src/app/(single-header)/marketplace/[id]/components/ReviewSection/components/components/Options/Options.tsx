import { Button } from "@/components/ui/button";
import { EllipsisVertical } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import AlertDestroyDialog from "@/components/AlertDestroyDialog";

type Props = {
    onUpdate: () => void;
    onDestroy: () => void;
};

function Options({ onUpdate, onDestroy }: Props) {
    const [showAlert, setShowAlert] = useState(false);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={"ghost"} size={"icon-sm"}>
                        <EllipsisVertical />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuGroup>
                        <DropdownMenuItem onClick={onUpdate}>
                            Cập nhật
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            variant="destructive"
                            onClick={() => setShowAlert(true)}
                        >
                            Xóa
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
            <AlertDestroyDialog
                open={showAlert}
                onOpenChange={setShowAlert}
                onConfirm={onDestroy}
            />
        </>
    );
}

export default Options;
