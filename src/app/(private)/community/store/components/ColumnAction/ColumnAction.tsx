"use client";

import AlertDestroyDialog from "@/components/AlertDestroyDialog";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type Props = {
    id: string;
    onDestroy: () => void;
};

function ColumnAction({ id, onDestroy }: Props) {
    const [showAlert, setShowAlert] = useState(false);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size={"icon-sm"}
                        className="rounded-none"
                    >
                        <Ellipsis />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <Link href={`/community/store/${id}/edit` as any}>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem
                        variant="destructive"
                        onClick={() => setShowAlert(true)}
                    >
                        Destroy
                    </DropdownMenuItem>
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

export default ColumnAction;
