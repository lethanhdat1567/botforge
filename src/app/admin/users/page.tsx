"use client";

import { columns } from "@/app/admin/users/columns";
import { DataTable } from "@/components/data-table/data-table";
import { adminUserService } from "@/services/adminUserService";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

function AdminUserPage() {
    const [users, setUsers] = useState([]);

    const http = useCallback(async () => {
        try {
            const res = await adminUserService.list();
            setUsers(res.data);
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
            await adminUserService.remove(ids);
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
            <h1 className="text-2xl font-bold">Danh sách người dùng</h1>
            <DataTable
                columns={columns}
                data={users}
                options={{
                    filterColumn: "displayName",
                }}
                onDestroy={handleDestroy}
            />
        </div>
    );
}

export default AdminUserPage;
