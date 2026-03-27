"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import Actions from "@/components/DataTable/components/Actions/Actions";
import { DataTableColumnHeader } from "@/components/DataTable/components/DataTableColumnHeader/DataTableColumnHeader";
import { timerFormat } from "@/lib/timer";
import { PostCategory } from "@/services/blogCategoryService";

interface BlogCategoryColumnProps {
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
    onView?: (id: string) => void;
}

export const getBlogColumns = ({
    onEdit,
    onDelete,
    onView,
}: BlogCategoryColumnProps): ColumnDef<PostCategory>[] => [
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
    // 1. Tên danh mục
    {
        accessorKey: "name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Tên danh mục" />
        ),
        cell: ({ row }) => (
            <span className="line-clamp-1 text-sm font-medium text-stone-900">
                {row.original.name}
            </span>
        ),
    },
    // 2. Slug
    {
        accessorKey: "slug",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Slug" />
        ),
        cell: ({ row }) => (
            <span className="font-mono text-[12px] text-stone-500">
                {row.original.slug}
            </span>
        ),
    },
    // 3. Ngày tạo
    {
        accessorKey: "createdAt",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Ngày tạo" />
        ),
        cell: ({ row }) => (
            <span className="text-xs text-stone-500 tabular-nums">
                {row.original.createdAt
                    ? timerFormat(row.original.createdAt)
                    : "-"}
            </span>
        ),
    },
    {
        id: "actions",
        header: "",
        cell: ({ row }) => (
            <div className="flex justify-end">
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
