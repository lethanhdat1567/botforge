"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { resolveMediaSrc } from "@/lib/image";

/* ================== TYPES ================== */

export interface CommunityFlow {
    id: string;
    flowId: string;
    userId: string;
    name: string;
    description: string | null;
    thumbnail: string | null;
    status: "active" | "inactive";
    downloadCount: number;
    createdAt: string;
    updatedAt: string;
    user: {
        id: string;
        username: string;
        displayName: string;
        avatar: string | null;
        email: string;
    };
}

/* ================== COLUMNS ================== */

export const columns: ColumnDef<CommunityFlow>[] = [
    /* ===== Select ===== */
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
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Chọn dòng"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },

    /* ===== Flow info ===== */
    {
        accessorKey: "name",
        header: "Flow",
        cell: ({ row }) => {
            const { name, description, thumbnail } = row.original;

            return (
                <div className="flex items-center gap-3">
                    {thumbnail ? (
                        <Image
                            src={resolveMediaSrc(thumbnail)}
                            alt={name}
                            width={40}
                            height={40}
                            className="rounded-md object-cover"
                        />
                    ) : (
                        <div className="bg-muted flex h-10 w-10 items-center justify-center rounded-md text-xs">
                            Flow
                        </div>
                    )}

                    <div className="flex flex-col">
                        <span className="font-medium">{name}</span>
                        {description && (
                            <span className="text-muted-foreground line-clamp-1 text-xs">
                                {description}
                            </span>
                        )}
                    </div>
                </div>
            );
        },
    },

    /* ===== Author ===== */
    {
        accessorKey: "user",
        header: "Tác giả",
        cell: ({ getValue }) => {
            const user = getValue<CommunityFlow["user"]>();

            return (
                <div className="flex items-center gap-2">
                    {user.avatar ? (
                        <Image
                            src={resolveMediaSrc(user.avatar)}
                            alt={user.displayName}
                            width={28}
                            height={28}
                            className="h-7 w-7 rounded-full object-cover"
                        />
                    ) : (
                        <div className="bg-muted h-7 w-7 rounded-full" />
                    )}

                    <div className="flex flex-col">
                        <span className="text-sm font-medium">
                            {user.displayName}
                        </span>
                        <span className="text-muted-foreground text-xs">
                            {user.email}
                        </span>
                    </div>
                </div>
            );
        },
    },

    /* ===== Status ===== */
    {
        accessorKey: "status",
        header: "Trạng thái",
        cell: ({ getValue }) => {
            const status = getValue<string>();

            return (
                <Badge variant={status === "active" ? "default" : "secondary"}>
                    {status === "active" ? "Đang hiển thị" : "Ẩn"}
                </Badge>
            );
        },
    },

    /* ===== Download count ===== */
    {
        accessorKey: "downloadCount",
        header: "Lượt tải",
        cell: ({ getValue }) => (
            <span className="font-medium">{getValue<number>()}</span>
        ),
    },

    /* ===== Created at ===== */
    {
        accessorKey: "createdAt",
        header: "Ngày chia sẻ",
        cell: ({ getValue }) =>
            new Date(getValue<string>()).toLocaleString("vi-VN"),
    },
];
