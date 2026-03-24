"use client";

import { columns } from "@/app/(private)/community/store/columns";
import { DataTable } from "@/components/data-table/data-table";
import { Button } from "@/components/ui/button";
import flowShareService, { FlowShare } from "@/services/flowSharedService";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function StorePage() {
    const [sharedTemplates, setSharedTemplates] = useState<FlowShare[]>([]);
    const fetchSharedTemplates = async () => {
        try {
            const res = await flowShareService.getList();

            setSharedTemplates(res.flowShares);
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
            await flowShareService.delete(id);
            toast.success("Template deleted successfully");
            fetchSharedTemplates();
        } catch (error) {
            console.log(error);
            toast.error("Failed to delete template");
        }
    }

    async function handleDestroyMany(rows: any[]) {
        const ids = rows.map((row: any) => row.original.id);
        // try {
        //     await flowShareService.deleteManyShared(ids);
        //     toast.success("Templates deleted successfully");
        //     fetchSharedTemplates();
        // } catch (error) {
        //     console.log(error);
        //     toast.error("Failed to delete templates");
        // }
    }

    return (
        <div>
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Quản lý mẫu chia sẻ</h1>
                <Link href={"/community/store/new" as any}>
                    <Button className="rounded-none">
                        Chia sẻ mẫu <Plus />
                    </Button>
                </Link>
            </div>
            {/* <div>
                <DataTable
                    columns={columns({ onDestroy: handleDestroy })}
                    data={sharedTemplates}
                    options={{
                        filterColumn: "flowId",
                    }}
                    onDestroy={handleDestroyMany}
                />
            </div> */}
        </div>
    );
}

export default StorePage;
