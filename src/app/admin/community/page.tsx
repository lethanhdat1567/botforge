"use client";

import { columns } from "@/app/admin/community/columns";
import { DataTable } from "@/components/data-table/data-table";
import { flowSharedService } from "@/services/flowSharedService";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

function AdminCommunityPage() {
    const [sharedTemplates, setSharedTemplates] = useState([]);

    const http = useCallback(async () => {
        try {
            const res = await flowSharedService.getAllShared();
            setSharedTemplates(res.data.data);
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
            await flowSharedService.deleteManyShared(ids);
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
            <h1 className="text-2xl font-bold">Danh sách mẫu cộng đồng</h1>
            <DataTable
                columns={columns}
                data={sharedTemplates}
                options={{
                    filterColumn: "name",
                }}
                onDestroy={handleDestroy}
            />
        </div>
    );
}

export default AdminCommunityPage;
