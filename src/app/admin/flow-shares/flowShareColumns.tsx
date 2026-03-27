"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { FlowShare } from "@/services/flowSharedService";
import Actions from "@/components/DataTable/components/Actions/Actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { resolveMediaSrc } from "@/lib/image";
import { timerFormat } from "@/lib/timer";
import { DataTableColumnHeader } from "@/components/DataTable/components/DataTableColumnHeader/DataTableColumnHeader";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageSquare, Download } from "lucide-react";

interface FlowShareColumnProps {
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
    onView?: (id: string) => void;
}

export const getFlowShareColumns = ({
    onEdit,
    onDelete,
    onView,
}: FlowShareColumnProps): ColumnDef<FlowShare>[] => [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Chọn tất cả"
                className="translate-y-0.5 border-stone-200"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Chọn hàng"
                className="translate-y-0.5 border-stone-200"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Tên quy trình" />
        ),
        cell: ({ row }) => {
            const { name, thumbnail } = row.original;

            return (
                <div className="flex items-center gap-4 py-2">
                    <div className="h-10 w-16 shrink-0 overflow-hidden bg-stone-100 ring-1 ring-stone-100">
                        {thumbnail ? (
                            <img
                                src={resolveMediaSrc(thumbnail) as string}
                                alt={name}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center text-[10px] font-bold text-stone-400 uppercase">
                                No Thumb
                            </div>
                        )}
                    </div>
                    <span className="line-clamp-1 text-sm font-medium tracking-tight text-stone-900">
                        {name}
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: "user",
        header: "Tác giả",
        cell: ({ row }) => {
            const user = row.original.user;
            if (!user) return <span className="text-xs text-stone-400">Ẩn danh</span>;

            return (
                <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6 ring-1 ring-stone-100">
                        <AvatarImage src={resolveMediaSrc(user.avatar) as string} />
                        <AvatarFallback className="text-[10px]">
                            {user.displayName.charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-stone-600">
                        {user.displayName}
                    </span>
                </div>
            );
        },
    },
    {
        id: "metrics",
        header: "Tương tác",
        cell: ({ row }) => {
            const { _count } = row.original;
            return (
                <div className="flex items-center gap-3 text-stone-500">
                    <div className="flex items-center gap-1">
                        <Heart className="h-3 w-3" />
                        <span className="text-xs tabular-nums">{_count?.flowShareLikes || 0}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <MessageSquare className="h-3 w-3" />
                        <span className="text-xs tabular-nums">{_count?.flowShareComments || 0}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Download className="h-3 w-3" />
                        <span className="text-xs tabular-nums">{_count?.flowShareDowloads || 0}</span>
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: "status",
        header: "Trạng thái",
        cell: ({ row }) => {
            const status = row.original.status;
            return (
                <Badge
                    variant={status === "active" ? "default" : "secondary"}
                    className={status === "active" ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-200" : "bg-stone-50 text-stone-600 hover:bg-stone-100 border-stone-200"}
                >
                    {status === "active" ? "Hoạt động" : "Tạm dừng"}
                </Badge>
            );
        },
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Ngày tạo" />
        ),
        cell: ({ row }) => (
            <span className="text-xs text-stone-500 tabular-nums">
                {timerFormat(row.original.createdAt)}
            </span>
        ),
    },
    {
        id: "actions",
        header: "",
        cell: ({ row }) => (
            <div className="flex justify-end transition-opacity">
                <Actions
                    id={row.original.id}
                    onView={onView}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            </div>
        ),
    },
];
