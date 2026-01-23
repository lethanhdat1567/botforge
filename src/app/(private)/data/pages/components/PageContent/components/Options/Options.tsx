import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import AlertDestroyDialog from "@/components/AlertDestroyDialog";
import { useState } from "react";

type Props = {
    onUpdate: () => void;
    onDuplicate: () => void;
    onDestroy: () => void;
};

function Options({ onUpdate, onDuplicate, onDestroy }: Props) {
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
                    <DropdownMenuLabel>Action</DropdownMenuLabel>
                    <DropdownMenuItem onClick={onUpdate}>
                        Update
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        variant="destructive"
                        onClick={() => setShowAlert(true)}
                    >
                        Delete
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
