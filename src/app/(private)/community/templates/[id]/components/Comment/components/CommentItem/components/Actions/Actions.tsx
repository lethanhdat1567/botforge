"use client";

import AlertDestroyDialog from "@/components/AlertDestroyDialog";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import { useState } from "react";

type Props = {
    onUpdate: () => void;
    onDestroy: () => void;
};

function Actions({ onUpdate, onDestroy }: Props) {
    const [showAlert, setShowAlert] = useState(false);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost">
                        <EllipsisVertical />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={onUpdate}>Edit</DropdownMenuItem>
                    <DropdownMenuItem
                        variant="destructive"
                        onClick={() => setShowAlert(true)}
                    >
                        Remove
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <AlertDestroyDialog
                onConfirm={onDestroy}
                open={showAlert}
                onOpenChange={setShowAlert}
            />
        </>
    );
}

export default Actions;
