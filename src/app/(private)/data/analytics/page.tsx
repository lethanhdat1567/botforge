"use client";

import { columns } from "@/app/(private)/data/analytics/columns";
import { DataTable } from "@/components/data-table/data-table";
import { userFlowStateService } from "@/services/userFlowStateService";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

function AnalyshPage() {
    const [trackingData, setTrackingData] = useState([]);

    const http = useCallback(async () => {
        try {
            const res = await userFlowStateService.getByOwner();
            setTrackingData(res.data.data);
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        http();
    }, [http]);

    async function handleDestroy(rows: any) {
        const ids = rows.map((row: any) => row.original.id);

        try {
            await userFlowStateService.deleteMany(ids);
            toast.success("Deleted successfully");
            http();
        } catch (error) {
            console.log(error);
            toast.error("Failed to delete");
        } finally {
        }
    }

    return (
        <div className="mx-auto">
            <h1 className="text-2xl font-bold">Thống kê hội thoại</h1>
            <DataTable
                columns={columns}
                data={trackingData}
                options={{
                    filterColumn: "flowId",
                }}
                onDestroy={handleDestroy}
            />
        </div>
    );
}

export default AnalyshPage;
