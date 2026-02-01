"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import Status from "@/app/(private)/data/analytics/components/Status";
import VariableDialog from "@/app/(private)/data/analytics/components/VariableDialog/VariableDialog";
import StepHistory from "@/app/(private)/data/analytics/components/StepHistory/StepHistory";

export interface TrackingFlow {
    id: string;
    platformUserId: string;
    ownerUserId: string;
    flowId: string;
    pageId: string;
    currentStep: string;
    stepHistory?: any; // JSON array
    variables?: any; // JSON object
    status: "running" | "pending" | "cancelled" | "completed";
    createdAt: Date;
    updatedAt: Date;
}

export const columns: ColumnDef<TrackingFlow>[] = [
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
        accessorKey: "platformUserId",
        header: "ID người dùng nền tảng",
    },
    {
        accessorKey: "flowId",
        header: "ID kịch bản",
    },
    {
        accessorKey: "currentStep",
        header: "Bước hiện tại",
    },
    {
        accessorKey: "stepHistory",
        header: "Lịch sử bước",
        cell: ({ getValue }) => {
            const value = getValue<any>();
            if (!value) return null;
            return <StepHistory history={value} />;
        },
    },
    {
        accessorKey: "variables",
        header: "Biến",
        cell: ({ getValue }) => {
            const value = getValue<any>();
            if (!value) return null;
            return <VariableDialog variable={value} />;
        },
    },
    {
        accessorKey: "status",
        header: "Trạng thái",
        cell: ({ getValue }) => {
            return <Status status={getValue<string>() as any} />;
        },
    },
    {
        accessorKey: "createdAt",
        header: "Thời điểm tạo",
        cell: ({ getValue }) =>
            new Date(getValue<Date>()).toLocaleString("vi-VN"),
    },
];
