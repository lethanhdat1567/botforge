/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { getBlogColumns } from "@/app/admin/blogs/blogColumns";
import AlertDestroyDialog from "@/components/AlertDestroyDialog";
import { DataTable } from "@/components/DataTable/DataTable";
import { DataTablePagination } from "@/components/DataTable/Pagination";
import SearchInput from "@/components/DataTable/SearchInput";
import { Button } from "@/components/ui/button";
import { blogService, Post } from "@/services/blogService";
import { PaginationMeta } from "@/types/data-table";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function BlogPage() {
    const router = useRouter();
    const [posts, setPosts] = useState<Post[]>([]);
    const [searchValue, setSearchValue] = useState("");
    const [meta, setMeta] = useState<PaginationMeta | null>(null);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [isAlertOpen, setIsAlertOpen] = useState(false);

    const fetchPosts = async (page = 1) => {
        try {
            const res = await blogService.listAdmin({
                q: searchValue,
                page: page,
                limit: 10,
            });

            setPosts(res.posts);
            setMeta(res.meta as any);
        } catch (error) {
            console.error("Error fetching posts:", error);
            toast.error("Không thể tải danh sách bài viết");
        }
    };

    useEffect(() => {
        fetchPosts();
    }, [searchValue]);

    const handleEdit = (id: string) => {
        router.push(`/admin/blogs/${id}`);
    };

    const handleDelete = async (id: string) => {
        try {
            await blogService.delete(id);
            toast.success("Xóa bài viết thành công");
            fetchPosts(meta?.currentPage);
        } catch (error) {
            console.error(error);
            toast.error("Xóa thất bại");
        }
    };

    const handleBulkDelete = async () => {
        try {
            await blogService.bulkDelete(selectedIds);
            toast.success(`Đã xóa ${selectedIds.length} bài viết`);
            setSelectedIds([]);
            fetchPosts(1);
        } catch (error) {
            console.error(error);
            toast.error("Xóa hàng loạt thất bại");
        }
    };

    const columns = getBlogColumns({
        onEdit: handleEdit,
        onDelete: handleDelete,
    });

    return (
        <div className="p-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-stone-800">
                        Quản lý bài viết
                    </h1>
                    <p className="text-sm text-stone-500">
                        Danh sách các bài viết trên hệ thống
                    </p>
                </div>
                <Link href="/admin/blogs/create">
                    <Button className="gap-2 rounded-none">
                        <Plus size={18} /> Viết bài mới
                    </Button>
                </Link>
            </div>

            <div className="mt-8">
                <DataTable
                    data={posts}
                    columns={columns}
                    onSelectionChange={(ids) => setSelectedIds(ids)}
                    toolbar={
                        <div className="flex items-center gap-4">
                            <SearchInput
                                onChange={(val) => setSearchValue(val)}
                                placeholder="Tìm kiếm bài viết..."
                            />
                            {selectedIds.length > 0 && (
                                <Button
                                    variant="destructive"
                                    className="rounded-none"
                                    onClick={() => setIsAlertOpen(true)}
                                >
                                    Xóa ({selectedIds.length})
                                </Button>
                            )}
                        </div>
                    }
                    pagination={
                        meta && (
                            <DataTablePagination
                                meta={meta}
                                onPageChange={fetchPosts}
                            />
                        )
                    }
                />
            </div>

            <AlertDestroyDialog
                open={isAlertOpen}
                onOpenChange={setIsAlertOpen}
                onConfirm={handleBulkDelete}
            />
        </div>
    );
}

export default BlogPage;
