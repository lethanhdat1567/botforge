"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import JsonPanel from "@/app/admin/flows/components/JsonPanel";

/* ================== TYPES ================== */

export interface AdminFlow {
    id: string;
    userId: string;
    pageId: string | null;
    folderId: string | null;
    name: string;
    description: string | null;
    status: "draft" | "active" | "inactive";
    logicJson?: any;
    layoutJson?: any;
    startNodeId: string | null;
    createdAt: string;
    updatedAt: string;
}

/* ================== COLUMNS ================== */

export const columns: ColumnDef<AdminFlow>[] = [
    /* ===== Checkbox ===== */
    // {
    //     id: "select",
    //     header: ({ table }) => (
    //         <Checkbox
    //             checked={
    //                 table.getIsAllPageRowsSelected() ||
    //                 (table.getIsSomePageRowsSelected() && "indeterminate")
    //             }
    //             onCheckedChange={(value) =>
    //                 table.toggleAllPageRowsSelected(!!value)
    //             }
    //             aria-label="Chọn tất cả"
    //         />
    //     ),
    //     cell: ({ row }) => (
    //         <Checkbox
    //             checked={row.getIsSelected()}
    //             onCheckedChange={(value) => row.toggleSelected(!!value)}
    //             aria-label="Chọn dòng"
    //         />
    //     ),
    //     enableSorting: false,
    //     enableHiding: false,
    // },

    /* ===== Flow name ===== */
    {
        accessorKey: "name",
        header: "Tên flow",
        cell: ({ row }) => {
            const { name, description } = row.original;

            return (
                <div className="flex flex-col">
                    <span className="font-medium">{name}</span>
                    {description && (
                        <span className="text-muted-foreground text-xs">
                            {description}
                        </span>
                    )}
                </div>
            );
        },
    },

    /* ===== User ID ===== */
    {
        accessorKey: "userId",
        header: "User ID",
        cell: ({ getValue }) => (
            <span className="text-muted-foreground text-xs">
                {getValue<string>()}
            </span>
        ),
    },

    /* ===== Folder ID ===== */
    {
        accessorKey: "folderId",
        header: "Folder",
        cell: ({ getValue }) => {
            const value = getValue<string | null>();
            return value ? (
                <span className="text-xs">{value}</span>
            ) : (
                <span className="text-muted-foreground text-xs">—</span>
            );
        },
    },

    /* ===== Status ===== */
    {
        accessorKey: "status",
        header: "Trạng thái",
        cell: ({ getValue }) => {
            const status = getValue<string>();

            const variant =
                status === "active"
                    ? "default"
                    : status === "draft"
                      ? "secondary"
                      : "outline";

            const label =
                status === "active"
                    ? "Hoạt động"
                    : status === "draft"
                      ? "Nháp"
                      : "Ngừng";

            return <Badge variant={variant}>{label}</Badge>;
        },
    },

    /* ===== Logic JSON ===== */
    {
        accessorKey: "logicJson",
        header: "Logic",
        cell: ({ row }) => (
            <div>
                <JsonPanel jsonData={row.getValue<any>("logicJson")} />
            </div>
        ),
        enableSorting: false,
    },

    /* ===== Layout JSON ===== */
    {
        accessorKey: "layoutJson",
        header: "Layout",
        cell: ({ row }) => (
            <div>
                <JsonPanel jsonData={row.getValue<any>("layoutJson")} />
            </div>
        ),
        enableSorting: false,
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
];
