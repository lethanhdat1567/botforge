"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { resolveMediaSrc } from "@/lib/image";
import GuideActions from "@/app/admin/guides/GuideActions";
import { guideService } from "@/services/guideService";
import { toast } from "sonner";

/* ================== COLUMNS ================== */

export interface Guide {
    id: string;
    slug: string;
    title: string;
    summary: string;
    content: string;
    thumbnail?: string;
    status: "draft" | "published" | "archived";
    createdAt: string;
    updatedAt: string;
}

export function guidesColumns(onRefresh: () => void): ColumnDef<Guide>[] {
    return [
        /* ===== Title ===== */
        {
            accessorKey: "title",
            header: "Bài viết",
            cell: ({ row }) => {
                const guide = row.original;

                return (
                    <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 rounded-md">
                            <AvatarImage
                                src={resolveMediaSrc(guide.thumbnail) as string}
                                className="object-cover"
                            />
                            <AvatarFallback>
                                {guide.title?.charAt(0) ?? "G"}
                            </AvatarFallback>
                        </Avatar>

                        <div className="flex flex-col">
                            <span className="line-clamp-1 font-medium">
                                {guide.title}
                            </span>
                            <span className="text-muted-foreground line-clamp-1 text-xs">
                                {guide.summary}
                            </span>
                        </div>
                    </div>
                );
            },
        },

        /* ===== Slug ===== */
        {
            accessorKey: "slug",
            header: "Slug",
            cell: ({ getValue }) => (
                <span className="text-muted-foreground text-sm">
                    {getValue<string>()}
                </span>
            ),
        },

        /* ===== Status ===== */
        {
            accessorKey: "status",
            header: "Trạng thái",
            cell: ({ getValue }) => {
                const status = getValue<Guide["status"]>();

                const map = {
                    draft: {
                        label: "Bản nháp",
                        variant: "secondary" as const,
                    },
                    published: {
                        label: "Đã xuất bản",
                        variant: "default" as const,
                    },
                    archived: {
                        label: "Lưu trữ",
                        variant: "outline" as const,
                    },
                };

                return (
                    <Badge variant={map[status].variant}>
                        {map[status].label}
                    </Badge>
                );
            },
        },

        /* ===== Created At ===== */
        {
            accessorKey: "createdAt",
            header: "Ngày tạo",
            cell: ({ getValue }) =>
                new Date(getValue<string>()).toLocaleString("vi-VN"),
        },

        /* ===== Updated At ===== */
        {
            accessorKey: "updatedAt",
            header: "Cập nhật",
            cell: ({ getValue }) =>
                new Date(getValue<string>()).toLocaleString("vi-VN"),
        },

        /* ===== Actions ===== */
        {
            id: "actions",
            header: "",
            cell: ({ row }) => (
                <GuideActions
                    id={row.original.id}
                    onDelete={async (id) => {
                        await guideService.remove(id);
                        toast.success("Deleted successfully");
                        onRefresh();
                    }}
                />
            ),
        },
    ];
}
