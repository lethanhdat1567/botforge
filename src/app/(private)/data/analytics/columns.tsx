"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { FileText } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
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
        accessorKey: "platformUserId",
        header: "Platform User ID",
    },
    {
        accessorKey: "flowId",
        header: "Flow ID",
    },
    {
        accessorKey: "currentStep",
        header: "Current Step",
    },
    {
        accessorKey: "stepHistory",
        header: "Step History",
        cell: ({ getValue }) => {
            const value = getValue<any>();

            if (!value) return null;

            return <StepHistory history={value} />;
        },
    },
    {
        accessorKey: "variables",
        header: "Variables",
        cell: ({ getValue }) => {
            const value = getValue<any>();

            if (!value) return null;

            return <VariableDialog variable={value} />;
        },
    },

    {
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }) => {
            return <Status status={getValue<string>() as any} />;
        },
    },
    {
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({ getValue }) => new Date(getValue<Date>()).toLocaleString(),
    },
];
