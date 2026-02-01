import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import AlertDestroyDialog from "@/components/AlertDestroyDialog";
import { useState } from "react";

type Props = {
    onDestroy: () => void;
};

function Options({ onDestroy }: Props) {
    const [showAlert, setShowAlert] = useState(false);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                        <EllipsisVertical />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="bottom" align="end">
                    <DropdownMenuLabel>Hành động</DropdownMenuLabel>
                    <DropdownMenuItem
                        variant="destructive"
                        onClick={() => setShowAlert(true)}
                    >
                        Xóa mẫu
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <AlertDestroyDialog
                onConfirm={onDestroy}
                open={showAlert}
                onOpenChange={setShowAlert}
                itemName="Template"
            />
        </>
    );
}

export default Options;
