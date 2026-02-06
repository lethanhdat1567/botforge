"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

/* ================== TYPES ================== */

export interface AdminUser {
    id: string;
    username: string;
    displayName: string;
    email: string;
    avatar?: string;
    role: "admin" | "user";
    provider: string;
    createdAt: string;
}

/* ================== COLUMNS ================== */

export const columns: ColumnDef<AdminUser>[] = [
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

    /* ===== User ===== */
    {
        accessorKey: "displayName",
        header: "Người dùng",
        cell: ({ row }) => {
            const user = row.original;

            return (
                <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>
                            {user.displayName?.charAt(0) ?? "U"}
                        </AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col">
                        <span className="font-medium">{user.displayName}</span>
                        <span className="text-muted-foreground text-xs">
                            {user.email}
                        </span>
                    </div>
                </div>
            );
        },
    },

    /* ===== Username ===== */
    {
        accessorKey: "username",
        header: "Username",
        cell: ({ getValue }) => (
            <span className="text-muted-foreground text-sm">
                {getValue<string>()}
            </span>
        ),
    },

    /* ===== Role ===== */
    {
        accessorKey: "role",
        header: "Vai trò",
        cell: ({ getValue }) => {
            const role = getValue<string>();

            return (
                <Badge variant={role === "admin" ? "destructive" : "secondary"}>
                    {role === "admin" ? "Admin" : "User"}
                </Badge>
            );
        },
    },

    /* ===== Provider ===== */
    {
        accessorKey: "provider",
        header: "Nguồn",
        cell: ({ getValue }) => (
            <span className="capitalize">{getValue<string>()}</span>
        ),
    },

    /* ===== Created At ===== */
    {
        accessorKey: "createdAt",
        header: "Ngày tạo",
        cell: ({ getValue }) =>
            new Date(getValue<string>()).toLocaleString("vi-VN"),
    },
];
