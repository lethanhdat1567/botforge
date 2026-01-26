"use client";

import { columns } from "@/app/(private)/community/store/columns";
import { DataTable } from "@/components/data-table/data-table";
import { Button } from "@/components/ui/button";
import { flowSharedService } from "@/services/flowSharedService";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function StorePage() {
    const [sharedTemplates, setSharedTemplates] = useState([]);
    const fetchSharedTemplates = async () => {
        try {
            const res = await flowSharedService.getMyShared();
            setSharedTemplates(res.data.data);
        } catch (error) {
            console.error("Error fetching shared templates:", error);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchSharedTemplates();
    }, []);

    async function handleDestroy(id: string) {
        try {
            await flowSharedService.removeShared(id);
            toast.success("Template deleted successfully");
            fetchSharedTemplates();
        } catch (error) {
            console.log(error);
            toast.error("Failed to delete template");
        }
    }

    async function handleDestroyMany(rows: any[]) {
        const ids = rows.map((row: any) => row.original.id);
        try {
            await flowSharedService.deleteManyShared(ids);
            toast.success("Templates deleted successfully");
            fetchSharedTemplates();
        } catch (error) {
            console.log(error);
            toast.error("Failed to delete templates");
        }
    }

    return (
        <div>
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">My Template</h1>
                <Link href={"/community/store/new" as any}>
                    <Button className="rounded-none">
                        Share Template <Plus />
                    </Button>
                </Link>
            </div>
            <div>
                <DataTable
                    columns={columns({ onDestroy: handleDestroy })}
                    data={sharedTemplates}
                    options={{
                        filterColumn: "flowId",
                    }}
                    onDestroy={handleDestroyMany}
                />
            </div>
        </div>
    );
}

export default StorePage;
