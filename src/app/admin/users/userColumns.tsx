"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { User } from "@/services/profileService";
import Actions from "@/components/DataTable/components/Actions/Actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { resolveMediaSrc } from "@/lib/image";
import { timerFormat } from "@/lib/timer";
import { DataTableColumnHeader } from "@/components/DataTable/components/DataTableColumnHeader/DataTableColumnHeader";

interface UserColumnProps {
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
    onView?: (id: string) => void;
}

export const getUserColumns = ({
    onEdit,
    onDelete,
    onView,
}: UserColumnProps): ColumnDef<User>[] => [
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
        accessorKey: "displayName",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Tên người dùng" />
        ),
        cell: ({ row }) => {
            const { displayName, avatar } = row.original;

            return (
                <div className="flex items-center gap-4 py-2">
                    <Avatar className="h-8 w-8 shadow-sm ring-1 ring-stone-100">
                        <AvatarImage
                            src={resolveMediaSrc(avatar) as string}
                            className="object-cover"
                        />
                        <AvatarFallback>{displayName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium tracking-tight text-stone-900 capitalize">
                        {displayName}
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: "role",
        header: "Vai trò",
        cell: ({ row }) => {
            const role = row.original.role;
            return (
                <span className="text-sm text-stone-900 capitalize">
                    {role}
                </span>
            );
        },
    },
    {
        accessorKey: "email",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Email" />
        ),
        cell: ({ row }) => (
            <span className="text-sm text-stone-900">{row.original.email}</span>
        ),
    },
    {
        accessorKey: "username",
        header: "Username",
        cell: ({ row }) => (
            <span className="text-sm text-stone-900">
                @{row.original.username}
            </span>
        ),
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Ngày tham gia" />
        ),
        cell: ({ row }) => (
            <span className="text-sm text-stone-900 tabular-nums">
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
