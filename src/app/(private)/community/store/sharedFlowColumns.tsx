// components/shared-flow/columns.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import Image from "next/image";
import { FlowShare } from "@/services/flowSharedService";
import { Heart, MessageSquare, Download } from "lucide-react";
import { resolveMediaSrc } from "@/lib/image";
import StatusBadge from "@/components/DataTable/components/StatusBadge/StatusBadge";
import Actions from "@/components/DataTable/components/Actions/Actions";

interface SharedFlowColumnProps {
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
    onView?: (id: string) => void;
}

export const getSharedFlowColumns = ({
    onEdit,
    onDelete,
    onView,
}: SharedFlowColumnProps): ColumnDef<FlowShare>[] => [
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
                className="border-muted-foreground translate-y-0.5"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Chọn hàng"
                className="border-muted-foreground translate-y-0.5"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "name",
        header: "Quy trình",
        cell: ({ row }) => {
            const { name, flow, thumbnail } = row.original;
            return (
                <div className="flex items-center gap-3 py-1">
                    <Image
                        src={resolveMediaSrc(thumbnail)}
                        width={32}
                        height={32}
                        alt=""
                        className="bg-muted h-8 w-8 rounded-sm border object-cover shadow-sm"
                    />
                    <div className="flex flex-col leading-tight">
                        <span className="text-foreground line-clamp-1 text-sm font-medium">
                            {name}
                        </span>
                        <span className="text-muted-foreground text-[11px] italic">
                            Mẫu: {flow?.name || "N/A"}
                        </span>
                    </div>
                </div>
            );
        },
    },
    {
        id: "community",
        header: "Cộng đồng",
        cell: ({ row }) => {
            const { _count } = row.original;
            return (
                <div className="text-muted-foreground flex items-center gap-4">
                    <div className="flex items-center gap-1" title="Lượt thích">
                        <Heart className="text-muted-foreground/60 h-3 w-3" />
                        <span className="text-[11px] font-medium">
                            {_count?.flowShareLikes || 0}
                        </span>
                    </div>
                    <div className="flex items-center gap-1" title="Bình luận">
                        <MessageSquare className="text-muted-foreground/60 h-3 w-3" />
                        <span className="text-[11px] font-medium">
                            {_count?.flowShareComments || 0}
                        </span>
                    </div>
                    <div className="flex items-center gap-1" title="Tải về">
                        <Download className="text-muted-foreground/60 h-3 w-3" />
                        <span className="text-[11px] font-medium">
                            {_count?.flowShareDowloads || 0}
                        </span>
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: "status",
        header: "Trạng thái",
        cell: ({ row }) => {
            const status = row.getValue("status") as string;
            return <StatusBadge status={status} />;
        },
    },
    {
        accessorKey: "createdAt",
        header: "Ngày tạo",
        cell: ({ row }) => (
            <span className="text-muted-foreground font-mono text-xs">
                {format(new Date(row.getValue("createdAt")), "dd/MM/yyyy")}
            </span>
        ),
    },
    {
        id: "actions",
        header: "",
        cell: ({ row }) => (
            <div className="flex justify-end">
                <Actions
                    id={row.original.id}
                    onView={onView}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            </div>
        ),
    },
];
