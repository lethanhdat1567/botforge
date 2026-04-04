"use client";

import { getSharedFlowColumns } from "@/app/(private)/community/store/sharedFlowColumns";
import AlertDestroyDialog from "@/components/AlertDestroyDialog";
import { DataTable } from "@/components/DataTable/DataTable";
import { DataTablePagination } from "@/components/DataTable/Pagination";
import SearchInput from "@/components/DataTable/SearchInput";
import { Button } from "@/components/ui/button";
import flowShareService, { FlowShare } from "@/services/flowSharedService";
import { PaginationMeta } from "@/types/data-table";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function StorePage() {
    const router = useRouter();
    const [sharedTemplates, setSharedTemplates] = useState<FlowShare[]>([]);
    const [searchValue, setSearchValue] = useState("");
    const [meta, setMeta] = useState<PaginationMeta | null>(null);
    const [destroySelect, setDestroySelect] = useState<string[]>([]);
    const [alertDestroy, setAlertDestroy] = useState(false);

    const fetchSharedTemplates = async (page = 1) => {
        try {
            const res = await flowShareService.getList({
                q: searchValue,
                page: page,
            });

            console.log(res.flowShares);

            setSharedTemplates(res.flowShares);
            setMeta(res.meta as any);
        } catch (error) {
            console.error("Error fetching shared templates:", error);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchSharedTemplates();
    }, [searchValue]);

    const handleEdit = (id: string) => {
        router.push(`/community/store/${id}/edit`);
    };

    const handleDelete = async (id: string) => {
        try {
            await flowShareService.delete(id);
            toast.success("Xóa thành công");
            fetchSharedTemplates();
        } catch (error) {
            console.log(error);
            toast.error("Xóa thất bại");
        }
    };

    const handleDestroySelect = async () => {
        try {
            await flowShareService.deleteMany(destroySelect);
            toast.success("Xóa thành công");
            setDestroySelect([]);
            fetchSharedTemplates();
        } catch (error) {
            console.log(error);
            toast.error("Xóa thất bại");
        }
    };

    const sharedColumns = getSharedFlowColumns({
        onEdit: handleEdit,
        onDelete: handleDelete,
        onView: (id) => console.log("Xem:", id),
    });

    return (
        <div className="min-w-0">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h1 className="text-xl font-semibold sm:text-2xl">
                    Quản lý mẫu chia sẻ
                </h1>
                <Link
                    href={"/community/store/new" as any}
                    className="shrink-0 sm:ml-2"
                >
                    <Button className="w-full rounded-none sm:w-auto">
                        Chia sẻ mẫu <Plus />
                    </Button>
                </Link>
            </div>
            <div className="mt-6 sm:mt-10">
                <DataTable
                    data={sharedTemplates}
                    columns={sharedColumns}
                    onSelectionChange={(ids) => setDestroySelect(ids)}
                    toolbar={
                        <div className="flex min-w-0 flex-wrap items-center gap-2 sm:gap-4">
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
                    }
                    pagination={
                        meta && (
                            <DataTablePagination
                                meta={meta}
                                onPageChange={fetchSharedTemplates}
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

export default StorePage;
