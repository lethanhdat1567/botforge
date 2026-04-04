"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { FlowRecord } from "@/services/flowRecordService";
import Actions from "@/components/DataTable/components/Actions/Actions";
import { Hash, User, Calendar } from "lucide-react";
import { dateFormat, timerFormat } from "@/lib/timer";
import FlowRecordStatusBadge from "@/app/(private)/data/analytics/components/FlowRecordStatusBadge";
import VariableDialog from "@/app/(private)/data/analytics/components/VariableDialog";
import { ErrorLogDialog } from "@/app/(private)/data/analytics/components/ErrorDialog";
import { DataTableColumnHeader } from "@/components/DataTable/components/DataTableColumnHeader/DataTableColumnHeader";

interface FlowRecordColumnProps {
    onDelete?: (id: string) => void;
    onView?: (id: string) => void;
}

export const getFlowRecordColumns = ({
    onDelete,
    onView,
}: FlowRecordColumnProps): ColumnDef<FlowRecord>[] => [
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
                className="border-input translate-y-0.5"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Chọn hàng"
                className="border-input translate-y-0.5"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "flowId",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Mã Quy trình" />
        ),
        cell: ({ row }) => (
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                    <Hash className="text-muted-foreground h-3 w-3" />
                    <span className="text-foreground font-mono text-[11px] font-medium uppercase">
                        {row.original.flowId.slice(-10)}
                    </span>
                </div>
                <span className="text-muted-foreground text-[10px] italic">
                    Node: {row.original.currentNodeId?.slice(-6) || "N/A"}
                </span>
            </div>
        ),
    },
    {
        accessorKey: "senderId",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Người gửi" />
        ),
        cell: ({ row }) => (
            <div className="text-foreground flex items-center gap-2">
                <User className="text-muted-foreground h-3.5 w-3.5" />
                <span className="text-xs font-medium">
                    {row.original.senderId || "Hệ thống"}
                </span>
            </div>
        ),
    },
    {
        accessorKey: "status",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Trạng thái" />
        ),
        cell: ({ row }) => (
            <FlowRecordStatusBadge status={row.original.status} />
        ),
    },
    {
        id: "variables",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Dữ liệu thu thập" />
        ),
        cell: ({ row }) => (
            <VariableDialog variables={row.original.variables} />
        ),
    },
    {
        accessorKey: "lastInteraction",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Tương tác cuối" />
        ),
        cell: ({ row }) => {
            const { lastInteraction, errorLog } = row.original;
            return (
                <div className="flex flex-col gap-1">
                    <div className="text-muted-foreground flex items-center gap-2">
                        <Calendar className="h-3 w-3" />
                        <span className="font-mono text-[11px]">
                            {timerFormat(lastInteraction)}
                        </span>
                    </div>
                    {errorLog && <ErrorLogDialog log={errorLog} />}
                </div>
            );
        },
    },
    {
        id: "actions",
        header: "",
        cell: ({ row }) => (
            <div className="flex justify-end">
                <Actions
                    id={row.original.id}
                    onDelete={onDelete}
                    onView={onView}
                />
            </div>
        ),
    },
];
