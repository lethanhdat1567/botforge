"use client";

import { guidesColumns } from "@/app/admin/guides/columns";
import type { Guide } from "@/app/admin/guides/columns";
import { DataTable } from "@/components/DataTable/DataTable";
import { guideService } from "@/services/guideService";
import { useCallback, useEffect, useState } from "react";

function AdminGuidePage() {
    const [users, setUsers] = useState<Guide[]>([]);

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

    return (
        <div className="mx-auto w-full min-w-0 max-w-6xl space-y-4">
            <h1 className="text-xl font-bold sm:text-2xl">
                Danh sách hướng dẫn
            </h1>
            <DataTable
                columns={guidesColumns(http)}
                data={users}
            />
        </div>
    );
}

export default AdminGuidePage;
