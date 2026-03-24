// components/shared-flow/actions.tsx
"use client";

import { Edit2, Eye, MoreHorizontal, Trash2 } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import AlertDestroyDialog from "@/components/AlertDestroyDialog";

interface ActionsProps {
    id: string;
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
    onView?: (id: string) => void;
}

export default function Actions({
    id,
    onEdit,
    onDelete,
    onView,
}: ActionsProps) {
    const [showDestroyAlert, setShowDestroyAlert] = useState(false);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="h-8 w-8 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    >
                        <span className="sr-only">Mở menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[160px]">
                    <DropdownMenuLabel className="text-muted-foreground text-[11px] font-medium">
                        Thao tác
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                        onClick={() => onView?.(id)}
                        className="cursor-pointer text-xs"
                    >
                        <Eye className="mr-2 h-3.5 w-3.5" />
                        Xem chi tiết
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        onClick={() => onEdit?.(id)}
                        className="cursor-pointer text-xs"
                    >
                        <Edit2 className="mr-2 h-3.5 w-3.5" />
                        Chỉnh sửa
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                        variant="destructive"
                        onClick={() => setShowDestroyAlert(true)}
                        className="text-destructive focus:text-destructive cursor-pointer text-xs"
                    >
                        <Trash2 className="mr-2 h-3.5 w-3.5" />
                        Xóa quy trình
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <AlertDestroyDialog
                open={showDestroyAlert}
                onOpenChange={setShowDestroyAlert}
                onConfirm={() => onDelete?.(id)}
            />
        </>
    );
}
