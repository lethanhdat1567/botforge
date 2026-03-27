"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Post } from "@/services/blogService";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

import Image from "next/image";
import { resolveMediaSrc } from "@/lib/image";
import { timerFormat } from "@/lib/timer";
import Actions from "@/components/DataTable/components/Actions/Actions";

type BlogColumnsProps = {
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
};

export const getBlogColumns = ({
    onEdit,
    onDelete,
}: BlogColumnsProps): ColumnDef<Post>[] => [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "thumbnail",
        header: "Ảnh",
        cell: ({ row }) => {
            const thumbnail = row.getValue("thumbnail") as string;
            console.log(thumbnail);

            return (
                <div className="relative h-12 w-20 overflow-hidden rounded border bg-stone-100">
                    <Image
                        src={resolveMediaSrc(thumbnail)}
                        alt={row.getValue("title")}
                        fill
                        className="object-cover"
                    />
                </div>
            );
        },
    },
    {
        accessorKey: "title",
        header: "Bài viết",
        cell: ({ row }) => (
            <div className="max-w-[300px]">
                <p className="truncate font-medium text-stone-900">
                    {row.getValue("title")}
                </p>
                <p className="truncate text-xs text-stone-500">
                    slug: {row.original.slug}
                </p>
            </div>
        ),
    },
    {
        accessorKey: "category",
        header: "Danh mục",
        cell: ({ row }) => {
            const category = row.original.category;
            return (
                <Badge variant="secondary" className="rounded-none font-normal">
                    {category?.name || "N/A"}
                </Badge>
            );
        },
    },
    {
        accessorKey: "status",
        header: "Trạng thái",
        cell: ({ row }) => {
            const status = row.getValue("status") as string;
            return (
                <Badge
                    className={`rounded-none font-normal ${
                        status === "active"
                            ? "bg-green-100 text-green-700 hover:bg-green-100"
                            : "bg-stone-100 text-stone-600 hover:bg-stone-100"
                    }`}
                >
                    {status === "active" ? "Hoạt động" : "Bản nháp"}
                </Badge>
            );
        },
    },
    {
        accessorKey: "createdAt",
        header: "Ngày tạo",
        cell: ({ row }) => timerFormat(row.getValue("createdAt")),
    },
    {
        id: "actions",
        cell: ({ row }) => (
            <div className="flex justify-end">
                <Actions
                    id={row.original.id}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            </div>
        ),
    },
];
