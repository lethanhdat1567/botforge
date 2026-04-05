/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import { DataTable } from "@/components/DataTable/DataTable";
import { DataTablePagination } from "@/components/DataTable/Pagination";
import SearchInput from "@/components/DataTable/SearchInput";
import { Button } from "@/components/ui/button";
import AlertDestroyDialog from "@/components/AlertDestroyDialog";
import { HttpError } from "@/http/helpers";
import {
    FlowShareCategory,
    flowShareCategoryService,
} from "@/services/flowSharedCategoryService";
import { getFlowShareCategoryColumns } from "@/app/admin/flow-share-categories/flowShareCategoryColumns";
import { PaginationMeta } from "@/types/data-table";

const PAGE_SIZE = 10;

function buildClientPaginationMeta(
    totalCount: number,
    currentPage: number,
    pageSize: number,
): PaginationMeta {
    const pageCount = Math.max(1, Math.ceil(totalCount / pageSize) || 1);
    const safePage = Math.min(Math.max(1, currentPage), pageCount);
    return {
        isFirstPage: safePage <= 1,
        isLastPage: safePage >= pageCount,
        currentPage: safePage,
        previousPage: safePage > 1 ? safePage - 1 : null,
        nextPage: safePage < pageCount ? safePage + 1 : null,
        pageCount,
        totalCount,
    };
}

function errorToastMessage(error: unknown, fallback: string) {
    if (error instanceof HttpError) {
        const msg = error.payload?.data?.message;
        if (msg && typeof msg === "string") return msg;
    }
    return fallback;
}

export default function FlowShareCategoriesPage() {
    const router = useRouter();
    const [categories, setCategories] = useState<FlowShareCategory[]>([]);
    const [searchValue, setSearchValue] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [destroySelect, setDestroySelect] = useState<string[]>([]);
    const [alertDestroy, setAlertDestroy] = useState(false);

    const fetchCategories = useCallback(async () => {
        try {
            const list = await flowShareCategoryService.list();
            setCategories(Array.isArray(list) ? list : []);
        } catch (error) {
            console.error("Error fetching flow share categories:", error);
            toast.error("Không thể tải danh sách danh mục mẫu cộng đồng");
        }
    }, []);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchValue]);

    const filteredCategories = useMemo(() => {
        const q = searchValue.trim().toLowerCase();
        if (!q) return categories;
        return categories.filter(
            (c) =>
                c.name.toLowerCase().includes(q) ||
                c.slug.toLowerCase().includes(q),
        );
    }, [categories, searchValue]);

    const paginationMeta = useMemo(
        () =>
            buildClientPaginationMeta(
                filteredCategories.length,
                currentPage,
                PAGE_SIZE,
            ),
        [filteredCategories.length, currentPage],
    );

    const pagedRows = useMemo(() => {
        const start = (paginationMeta.currentPage - 1) * PAGE_SIZE;
        return filteredCategories.slice(start, start + PAGE_SIZE);
    }, [filteredCategories, paginationMeta.currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleDelete = async (id: string) => {
        try {
            await flowShareCategoryService.remove(id);
            toast.success("Xóa thành công");
            fetchCategories();
        } catch (error) {
            console.error(error);
            toast.error(errorToastMessage(error, "Xóa thất bại"));
        }
    };

    const handleDestroySelect = async () => {
        try {
            await flowShareCategoryService.bulkDelete(destroySelect);
            toast.success("Xóa hàng loạt thành công");
            setDestroySelect([]);
            fetchCategories();
        } catch (error) {
            console.error(error);
            toast.error(errorToastMessage(error, "Xóa hàng loạt thất bại"));
        }
    };

    const columns = getFlowShareCategoryColumns({
        onEdit: (id) => {
            const cat = categories.find((c) => c.id === id);
            if (cat) {
                router.push(
                    `/admin/flow-share-categories/${encodeURIComponent(cat.slug)}`,
                );
            }
        },
        onDelete: handleDelete,
    });

    return (
        <div className="min-h-0 w-full min-w-0 flex-1 space-y-6 bg-neutral-50/30 sm:space-y-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 space-y-1">
                    <h1 className="text-xl font-bold tracking-tight text-stone-900 sm:text-2xl">
                        Quản lý danh mục mẫu cộng đồng
                    </h1>
                    <p className="text-xs font-medium text-stone-500 italic">
                        Danh sách danh mục phân loại mẫu trên marketplace
                    </p>
                </div>
                <Link
                    href="/admin/flow-share-categories/create"
                    className="shrink-0"
                >
                    <Button className="w-full sm:w-auto">
                        Tạo danh mục mới <Plus />
                    </Button>
                </Link>
            </div>

            <div className="mt-4 sm:mt-6">
                <DataTable
                    data={pagedRows}
                    columns={columns}
                    onSelectionChange={(ids) => setDestroySelect(ids)}
                    toolbar={
                        <div className="flex min-w-0 flex-wrap items-center gap-2 sm:gap-4">
                            <SearchInput
                                onChange={(val) => setSearchValue(val)}
                                placeholder="Tìm kiếm danh mục..."
                            />
                            {destroySelect.length > 0 && (
                                <Button
                                    variant={"destructive"}
                                    className="rounded-none text-[11px] font-bold tracking-widest uppercase"
                                    onClick={() => setAlertDestroy(true)}
                                >
                                    Xóa {destroySelect.length} danh mục
                                </Button>
                            )}
                        </div>
                    }
                    pagination={
                        <div className="border-t border-stone-100 bg-stone-50/30">
                            <DataTablePagination
                                meta={paginationMeta}
                                onPageChange={handlePageChange}
                            />
                        </div>
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
