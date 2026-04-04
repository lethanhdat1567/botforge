"use client";

import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import Link from "next/link";

import { DataTable } from "@/components/DataTable/DataTable";
import { DataTablePagination } from "@/components/DataTable/Pagination";
import SearchInput from "@/components/DataTable/SearchInput";
import { Button } from "@/components/ui/button";
import AlertDestroyDialog from "@/components/AlertDestroyDialog";

import { profileService, User } from "@/services/profileService";
import { PaginationMeta } from "@/types/data-table";
import { getUserColumns } from "./userColumns";

export default function AdminUserPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [searchValue, setSearchValue] = useState("");
    const [meta, setMeta] = useState<PaginationMeta | null>(null);
    const [destroySelect, setDestroySelect] = useState<string[]>([]);
    const [alertDestroy, setAlertDestroy] = useState(false);

    const fetchUsers = useCallback(
        async (page = 1) => {
            try {
                const data = await profileService.getAdminUsers({
                    q: searchValue,
                    page: page,
                });

                setUsers(data.users);
                setMeta(data.meta);
            } catch (error) {
                console.error("Error fetching admin users:", error);
                toast.error("Không thể tải danh sách người dùng");
            }
        },
        [searchValue],
    );

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleDelete = async (id: string) => {
        try {
            await profileService.deleteUser(id);
            toast.success("Xóa người dùng thành công");
            fetchUsers(meta?.currentPage || 1);
        } catch (error) {
            console.error(error);
            toast.error("Xóa người dùng thất bại");
        }
    };

    const handleDestroySelect = async () => {
        try {
            await profileService.deleteBulkUsers(destroySelect);
            toast.success("Xóa hàng loạt thành công");
            setDestroySelect([]);
            fetchUsers(1);
        } catch (error) {
            console.error(error);
            toast.error("Xóa hàng loạt thất bại");
        }
    };

    const userColumns = getUserColumns({
        onDelete: handleDelete,
    });

    return (
        <div className="min-h-0 w-full min-w-0 flex-1 space-y-6 bg-neutral-50/30 sm:space-y-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 space-y-1">
                    <h1 className="text-xl font-bold tracking-tight text-stone-900 sm:text-2xl">
                        Quản lý người dùng
                    </h1>
                    <p className="text-xs font-medium text-stone-500 italic">
                        Danh sách và phân quyền người dùng trong hệ thống
                    </p>
                </div>
                <Link href={"/admin/users/new" as any} className="shrink-0">
                    <Button className="w-full rounded-none bg-black text-white shadow-md transition-all hover:bg-stone-800 active:scale-95 sm:w-auto">
                        <Plus className="mr-2 h-4 w-4" />
                        Tạo người dùng
                    </Button>
                </Link>
            </div>

            <div className="mt-4 sm:mt-6">
                <DataTable
                    data={users}
                    columns={userColumns}
                    onSelectionChange={(ids) => setDestroySelect(ids)}
                    toolbar={
                        <div className="flex min-w-0 flex-wrap items-center gap-2 sm:gap-4">
                            <SearchInput
                                onChange={(val) => setSearchValue(val)}
                                placeholder="Tìm kiếm người dùng..."
                            />
                            {destroySelect.length > 0 && (
                                <Button
                                    variant={"destructive"}
                                    className="rounded-none text-[11px] font-bold tracking-widest uppercase"
                                    onClick={() => setAlertDestroy(true)}
                                >
                                    Xóa {destroySelect.length} người dùng
                                </Button>
                            )}
                        </div>
                    }
                    pagination={
                        meta && (
                            <div className="border-t border-stone-100 bg-stone-50/30">
                                <DataTablePagination
                                    meta={meta}
                                    onPageChange={fetchUsers}
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
