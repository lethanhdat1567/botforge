"use client";

import { getFlowRecordColumns } from "@/app/(private)/data/analytics/columns";
import TabStatus from "@/app/(private)/data/analytics/components/TabStatus";
import AlertDestroyDialog from "@/components/AlertDestroyDialog";
import { DataTable } from "@/components/DataTable/DataTable";
import { DataTablePagination } from "@/components/DataTable/Pagination";
import SearchInput from "@/components/DataTable/SearchInput";
import { Button } from "@/components/ui/button";
import { FlowRecord, flowRecordService } from "@/services/flowRecordService";
import { PaginationMeta } from "@/types/data-table";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function AnalyshPage() {
    const [flowRecords, setFlowRecords] = useState<FlowRecord[]>([]);
    const [searchValue, setSearchValue] = useState("");
    const [meta, setMeta] = useState<PaginationMeta | null>(null);
    const [destroySelect, setDestroySelect] = useState<string[]>([]);
    const [alertDestroy, setAlertDestroy] = useState(false);
    const [status, setStatus] = useState("");

    const fetchFlowRecord = async (page = 1) => {
        try {
            const res = await flowRecordService.list({
                q: searchValue,
                page: page,
                status: status === "all" ? undefined : status,
            });

            setFlowRecords(res.flowRecords);
            setMeta(res.meta as any);
        } catch (error) {
            console.error("Error fetching shared templates:", error);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchFlowRecord();
    }, [searchValue, status]);

    const handleDelete = async (id: string) => {
        try {
            await flowRecordService.delete(id);
            toast.success("Xóa thành công");
            fetchFlowRecord();
        } catch (error) {
            console.log(error);
            toast.error("Xóa thất bại");
        }
    };

    const handleDestroySelect = async () => {
        try {
            await flowRecordService.bulkDelete(destroySelect);
            toast.success("Xóa thành công");
            setDestroySelect([]);
            fetchFlowRecord();
        } catch (error) {
            console.log(error);
            toast.error("Xóa thất bại");
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Thống kê hội thoại</h1>
            </div>
            <div className="mt-10">
                <DataTable
                    data={flowRecords}
                    columns={getFlowRecordColumns({ onDelete: handleDelete })}
                    onSelectionChange={(ids) => setDestroySelect(ids)}
                    toolbar={
                        <div className="flex w-full items-center justify-between gap-40">
                            <div className="flex items-center gap-4">
                                <SearchInput
                                    onChange={(val) => setSearchValue(val)}
                                    placeholder="Tìm tên quy trình..."
                                />
                                {destroySelect.length > 0 && (
                                    <Button
                                        variant={"destructive"}
                                        onClick={() => setAlertDestroy(true)}
                                    >
                                        Xóa ({destroySelect.length})
                                    </Button>
                                )}
                            </div>
                            <TabStatus
                                onStatusChange={setStatus}
                                value={status}
                            />
                        </div>
                    }
                    pagination={
                        meta && (
                            <DataTablePagination
                                meta={meta}
                                onPageChange={fetchFlowRecord}
                            />
                        )
                    }
                />
            </div>
            <AlertDestroyDialog
                open={alertDestroy}
                onOpenChange={setAlertDestroy}
                onConfirm={handleDestroySelect}
            />
        </div>
    );
}

export default AnalyshPage;
