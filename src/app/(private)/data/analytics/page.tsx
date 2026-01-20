"use client";

import React from "react";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";

import { DataTable } from "@/components/data-table/data-table";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { useDataTable } from "@/hooks/use-data-table";
import { userFlowColumns } from "@/app/(private)/data/analytics/columns";
import { useAuthStore } from "@/store/authStore";
import { userFlowStateService } from "@/services/userFlowStateService";

export default function UserFlowAnalyticsPage() {
    const user = useAuthStore((state) => state.user);

    const [flowId] = useQueryState("flowId", parseAsString.withDefault(""));
    const [status] = useQueryState(
        "status",
        parseAsArrayOf(parseAsString).withDefault([]),
    );

    const [data, setData] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);

    // Fetch by owner (user.id lấy từ token)
    React.useEffect(() => {
        if (!user?.id) return;

        userFlowStateService
            .getByOwner()
            .then((res) => {
                setData(res.data.data ?? []);
            })
            .finally(() => setLoading(false));
    }, [user?.id]);

    // Filter theo query
    const filteredData = React.useMemo(() => {
        return data.filter((item) => {
            const matchesFlow =
                flowId === "" ||
                item.flowId.toLowerCase().includes(flowId.toLowerCase());

            const matchesStatus =
                status.length === 0 || status.includes(item.status);

            return matchesFlow && matchesStatus;
        });
    }, [data, flowId, status]);

    const { table } = useDataTable({
        data: filteredData,
        columns: userFlowColumns,
        pageCount: 10,
        getRowId: (row) => row.id,
        initialState: {
            sorting: [{ id: "createdAt", desc: true }],
            columnPinning: { right: ["actions"] },
        },
    });

    if (loading) {
        return (
            <div className="text-muted-foreground p-6 text-sm">Loading…</div>
        );
    }

    return (
        <div className="data-table-container">
            <DataTable table={table}>
                <DataTableToolbar table={table} />
            </DataTable>
        </div>
    );
}
