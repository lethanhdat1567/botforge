"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { DataTable } from "@/components/DataTable/DataTable";
import { DataTablePagination } from "@/components/DataTable/Pagination";
import SearchInput from "@/components/DataTable/SearchInput";
import { Button } from "@/components/ui/button";
import AlertDestroyDialog from "@/components/AlertDestroyDialog";

import flowShareService, { FlowShare } from "@/services/flowSharedService";
import { PaginationMeta } from "@/types/data-table";
import { getFlowShareColumns } from "./flowShareColumns";

export default function AdminFlowSharesPage() {
    const router = useRouter();
    const [flowShares, setFlowShares] = useState<FlowShare[]>([]);
    const [searchValue, setSearchValue] = useState("");
    const [meta, setMeta] = useState<PaginationMeta | null>(null);
    const [destroySelect, setDestroySelect] = useState<string[]>([]);
    const [alertDestroy, setAlertDestroy] = useState(false);

    const fetchFlowShares = useCallback(
        async (page = 1) => {
            try {
                const data = await flowShareService.getListForAdmin({
                    q: searchValue,
                    page: page,
                    status: "active",
                });

                setFlowShares(data.flowShares);
                setMeta(data.meta);
            } catch (error) {
                console.error("Error fetching admin flow shares:", error);
                toast.error("Không thể tải danh sách quy trình chia sẻ");
            }
        },
        [searchValue],
    );

    useEffect(() => {
        fetchFlowShares();
    }, [fetchFlowShares]);

    const handleDelete = async (id: string) => {
        try {
            await flowShareService.delete(id);
            toast.success("Xóa quy trình chia sẻ thành công");
            fetchFlowShares(meta?.currentPage || 1);
        } catch (error) {
            console.error(error);
            toast.error("Xóa quy trình chia sẻ thất bại");
        }
    };

    const handleDestroySelect = async () => {
        try {
            await flowShareService.deleteMany(destroySelect);
            toast.success("Xóa hàng loạt thành công");
            setDestroySelect([]);
            fetchFlowShares(1);
        } catch (error) {
            console.error(error);
            toast.error("Xóa hàng loạt thất bại");
        }
    };

    const flowShareColumns = getFlowShareColumns({
        onDelete: handleDelete,
        onView: (id) => router.push(`/marketplace/${id}`),
    });

    return (
        <div className="min-h-0 w-full min-w-0 flex-1 space-y-6 bg-neutral-50/30 sm:space-y-8">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 space-y-1">
                    <h1 className="text-xl font-bold tracking-tight text-stone-900 sm:text-2xl">
                        Quản lý Thư viện quy trình
                    </h1>
                    <p className="text-xs font-medium text-stone-500 italic">
                        Danh sách các quy trình được người dùng chia sẻ lên thư
                        viện
                    </p>
                </div>
            </div>

            <div className="mt-4 sm:mt-6">
                <DataTable
                    data={flowShares}
                    columns={flowShareColumns}
                    onSelectionChange={(ids) => setDestroySelect(ids)}
                    toolbar={
                        <div className="flex min-w-0 flex-wrap items-center gap-2 sm:gap-4">
                            <SearchInput
                                onChange={(val) => setSearchValue(val)}
                                placeholder="Tìm kiếm quy trình..."
                            />
                            {destroySelect.length > 0 && (
                                <Button
                                    variant={"destructive"}
                                    className="rounded-none text-[11px] font-bold tracking-widest uppercase"
                                    onClick={() => setAlertDestroy(true)}
                                >
                                    Xóa {destroySelect.length} quy trình
                                </Button>
                            )}
                        </div>
                    }
                    pagination={
                        meta && (
                            <div className="border-t border-stone-100 bg-stone-50/30">
                                <DataTablePagination
                                    meta={meta}
                                    onPageChange={fetchFlowShares}
                                />
                            </div>
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
