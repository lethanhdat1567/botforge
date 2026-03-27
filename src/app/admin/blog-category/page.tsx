/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { DataTable } from "@/components/DataTable/DataTable";
import SearchInput from "@/components/DataTable/SearchInput";
import { Button } from "@/components/ui/button";
import AlertDestroyDialog from "@/components/AlertDestroyDialog";

import {
    PostCategory,
    postCategoryService,
} from "@/services/blogCategoryService";
import { getBlogColumns } from "@/app/admin/blog-category/blogCategoryColumns";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function AdminBlogCategoryPage() {
    const router = useRouter();
    const [blogs, setBlogs] = useState<PostCategory[]>([]);
    const [searchValue, setSearchValue] = useState("");
    const [destroySelect, setDestroySelect] = useState<string[]>([]);
    const [alertDestroy, setAlertDestroy] = useState(false);

    const fetchBlogCategories = useCallback(async () => {
        try {
            const res = await postCategoryService.list({
                q: searchValue,
            });

            setBlogs(res.postCategories);
        } catch (error) {
            console.error("Error fetching admin flow shares:", error);
            toast.error("Không thể tải danh sách danh mục bài viết");
        }
    }, [searchValue]);

    useEffect(() => {
        fetchBlogCategories();
    }, [fetchBlogCategories]);

    const handleDelete = async (id: string) => {
        try {
            await postCategoryService.delete(id);
            toast.success("Xóa thành công");
            fetchBlogCategories();
        } catch (error) {
            console.error(error);
            toast.error("Xóa thất bại");
        }
    };

    const handleDestroySelect = async () => {
        try {
            await postCategoryService.bulkDelete(destroySelect);
            toast.success("Xóa hàng loạt thành công");
            setDestroySelect([]);
            fetchBlogCategories();
        } catch (error) {
            console.error(error);
            toast.error("Xóa hàng loạt thất bại");
        }
    };

    const flowShareColumns = getBlogColumns({
        onEdit: (id) => router.push(`/admin/blog-category/${id}`),
        onDelete: handleDelete,
    });

    return (
        <div className="min-h-screen flex-1 space-y-8 bg-neutral-50/30">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold tracking-tight text-stone-900">
                        Quản lý danh mục bài viết
                    </h1>
                    <p className="text-xs font-medium text-stone-500 italic">
                        Danh sách danh mục bài viết
                    </p>
                </div>
                <Link href="/admin/blog-category/create">
                    <Button>
                        Tạo danh mục mới <Plus />
                    </Button>
                </Link>
            </div>

            <div className="mt-6">
                <DataTable
                    data={blogs}
                    columns={flowShareColumns}
                    onSelectionChange={(ids) => setDestroySelect(ids)}
                    toolbar={
                        <div className="flex items-center gap-4">
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
