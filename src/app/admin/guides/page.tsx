"use client";

import { guidesColumns } from "@/app/admin/guides/columns";
import { DataTable } from "@/components/data-table/data-table";
import { guideService } from "@/services/guideService";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

function AdminGuidePage() {
    const [users, setUsers] = useState([]);

    const http = useCallback(async () => {
        try {
            const res = await guideService.list();

            setUsers(res.data.items);
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
            await guideService.remove(ids);
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
            <h1 className="text-2xl font-bold">Danh sách hướng dẫn</h1>
            <DataTable
                columns={guidesColumns(http)}
                data={users}
                options={{
                    filterColumn: "title",
                }}
                onDestroy={handleDestroy}
            />
        </div>
    );
}

export default AdminGuidePage;
