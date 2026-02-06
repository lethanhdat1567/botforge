"use client";

import { columns } from "@/app/admin/flows/columns";
import { DataTable } from "@/components/data-table/data-table";
import { flowService } from "@/services/flowService";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
function FlowsPage() {
    const [flows, setFlows] = useState([]);

    const http = useCallback(async () => {
        try {
            const res = await flowService.getFlows({});
            setFlows(res.data);
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
            await flowService.destroyFlow(ids);
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
            <h1 className="text-2xl font-bold">Danh sách flows</h1>
            <DataTable
                columns={columns}
                data={flows}
                options={{
                    filterColumn: "name",
                }}
                onDestroy={handleDestroy}
            />
        </div>
    );
}

export default FlowsPage;
