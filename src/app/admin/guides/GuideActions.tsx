"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AlertDestroyDialog from "@/components/AlertDestroyDialog";

type Props = {
    id: string;
    onDelete?: (id: string) => void;
};

function GuideActions({ id, onDelete }: Props) {
    const router = useRouter();
    const [isAlert, setIsAlert] = useState(false);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-40">
                    {/* Edit */}
                    <DropdownMenuItem
                        onClick={() => router.push(`/admin/guides/${id}`)}
                    >
                        <Pencil className="mr-2 h-4 w-4" />
                        Chỉnh sửa
                    </DropdownMenuItem>

                    {/* Delete */}

                    <DropdownMenuItem
                        variant="destructive"
                        onSelect={(e) => e.preventDefault()}
                        onClick={() => setIsAlert(true)}
                    >
                        <Trash className="mr-2 h-4 w-4" />
                        Xóa
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <AlertDestroyDialog
                open={isAlert}
                onOpenChange={setIsAlert}
                onConfirm={() => onDelete && onDelete(id)}
            />
        </>
    );
}

export default GuideActions;
