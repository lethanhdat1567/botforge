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

    // Nếu không có bất kỳ hành động nào được truyền vào, không render menu để tối ưu UI
    if (!onEdit && !onDelete && !onView) return null;

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
                <DropdownMenuContent
                    align="end"
                    className="w-[160px] rounded-none border-neutral-200"
                >
                    <DropdownMenuLabel className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">
                        Thao tác
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    {onView && (
                        <DropdownMenuItem
                            onClick={() => onView(id)}
                            className="cursor-pointer text-xs"
                        >
                            <Eye className="mr-2 h-3.5 w-3.5" />
                            Xem chi tiết
                        </DropdownMenuItem>
                    )}

                    {onEdit && (
                        <DropdownMenuItem
                            onClick={() => onEdit(id)}
                            className="cursor-pointer text-xs"
                        >
                            <Edit2 className="mr-2 h-3.5 w-3.5" />
                            Chỉnh sửa
                        </DropdownMenuItem>
                    )}

                    {onDelete && (
                        <>
                            {(onView || onEdit) && <DropdownMenuSeparator />}
                            <DropdownMenuItem
                                variant="destructive"
                                onClick={() => setShowDestroyAlert(true)}
                                className="text-destructive focus:text-destructive cursor-pointer text-xs"
                            >
                                <Trash2 className="mr-2 h-3.5 w-3.5" />
                                Xóa quy trình
                            </DropdownMenuItem>
                        </>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>

            {onDelete && (
                <AlertDestroyDialog
                    open={showDestroyAlert}
                    onOpenChange={setShowDestroyAlert}
                    onConfirm={() => onDelete(id)}
                />
            )}
        </>
    );
}
