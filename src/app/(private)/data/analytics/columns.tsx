"use client";

import type { Column, ColumnDef } from "@tanstack/react-table";
import {
    CheckCircle2,
    Clock,
    Loader,
    XCircle,
    MoreHorizontal,
    Text,
    LucideIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import {
    UserFlowState,
    UserFlowStatus,
} from "@/app/(private)/data/analytics/type";

const STATUS_META: Record<
    UserFlowStatus,
    { label: string; icon: React.ElementType }
> = {
    running: { label: "Running", icon: Loader },
    pending: { label: "Pending", icon: Clock },
    completed: { label: "Completed", icon: CheckCircle2 },
    cancelled: { label: "Cancelled", icon: XCircle },
};

export const userFlowColumns: ColumnDef<UserFlowState>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(v) => row.toggleSelected(!!v)}
            />
        ),
        size: 32,
        enableSorting: false,
        enableHiding: false,
    },

    {
        id: "flowId",
        accessorKey: "flowId",
        header: ({ column }: { column: Column<UserFlowState> }) => (
            <DataTableColumnHeader column={column} label="Flow ID" />
        ),
        cell: ({ cell }) => cell.getValue<string>(),
        meta: {
            label: "Flow ID",
            placeholder: "Search flow id...",
            variant: "text",
            icon: Text,
        },
        enableColumnFilter: true,
    },

    {
        accessorKey: "currentStep",
        header: ({ column }: { column: Column<UserFlowState> }) => (
            <DataTableColumnHeader column={column} label="Current Step" />
        ),
    },

    {
        accessorKey: "status",
        header: ({ column }: { column: Column<UserFlowState> }) => (
            <DataTableColumnHeader column={column} label="Status" />
        ),
        cell: ({ cell }) => {
            const status = cell.getValue<UserFlowStatus>();
            const { icon: Icon, label } = STATUS_META[status];

            return (
                <Badge variant="outline" className="gap-1 capitalize">
                    <Icon className="size-4" />
                    {label}
                </Badge>
            );
        },
        meta: {
            label: "Status",
            variant: "multiSelect",
            options: [
                {
                    label: "Running",
                    value: "running",
                    icon: CheckCircle2 as LucideIcon,
                },
                {
                    label: "Pending",
                    value: "pending",
                    icon: XCircle as LucideIcon,
                },
            ],
        },
        enableColumnFilter: true,
    },

    {
        accessorKey: "updatedAt",
        header: ({ column }: { column: Column<UserFlowState> }) => (
            <DataTableColumnHeader column={column} label="Updated" />
        ),
        cell: ({ cell }) => new Date(cell.getValue<string>()).toLocaleString(),
    },

    {
        id: "actions",
        cell: () => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <MoreHorizontal className="size-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem>View</DropdownMenuItem>
                    <DropdownMenuItem>Restart</DropdownMenuItem>
                    <DropdownMenuItem variant="destructive">
                        Cancel
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        ),
        size: 32,
    },
];
