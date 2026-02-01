"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";

import ColumnName from "@/app/(private)/community/store/components/ColumnName/ColumnName";
import { DataTableColumnHeader } from "@/components/data-table/column-header";
import Link from "next/link";
import { Download } from "lucide-react";
import ColumnStatus from "@/app/(private)/community/store/components/ColumnStatus/ColumnStatus";
import { timerFormat } from "@/lib/timer";
import ColumnAction from "@/app/(private)/community/store/components/ColumnAction/ColumnAction";

export interface FlowShareType {
    id: string;
    flowId: string;
    userId: string;
    name: string;
    status?: "active" | "inactive";
    description?: string | null;
    thumbnail?: string | null;
    downloadCount: number;
    createdAt: Date;
    updatedAt: Date;
}

export const columns = ({
    onDestroy,
}: {
    onDestroy: (id: string) => void;
}): ColumnDef<FlowShareType>[] => [
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

    {
        accessorKey: "name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Tên mẫu" />
        ),
        cell: ({ row }) => (
            <ColumnName
                thumbnail={row.original.thumbnail}
                name={row.original.name}
            />
        ),
    },

    {
        accessorKey: "flowId",
        header: "Kịch bản",
        cell: ({ getValue }) => (
            <Link
                href={"/bot/flows" as any}
                className="text-sm font-medium hover:underline"
            >
                {getValue<string>()}
            </Link>
        ),
    },

    {
        accessorKey: "downloadCount",
        header: "Lượt tải",
        cell: ({ getValue }) => (
            <div className="flex items-center gap-2 text-sm">
                <Download size={18} />
                {getValue<number>()}
            </div>
        ),
    },

    {
        accessorKey: "status",
        header: "Trạng thái",
        cell: ({ getValue }) => <ColumnStatus status={getValue() as any} />,
    },

    {
        accessorKey: "createdAt",
        header: "Ngày tạo",
        cell: ({ getValue }) => <div>{timerFormat(getValue<Date>())}</div>,
    },

    {
        accessorKey: "updatedAt",
        header: "Cập nhật gần nhất",
        cell: ({ getValue }) => <div>{timerFormat(getValue<Date>())}</div>,
    },

    {
        accessorKey: "action",
        header: "Thao tác",
        cell: ({ row }) => (
            <ColumnAction
                id={row.original.id}
                onDestroy={() => onDestroy(row.original.id)}
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
];
