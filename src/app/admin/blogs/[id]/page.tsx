"use client";

import BackBtn from "@/app/(private)/components/BackBtn/BackBtn";
import { Button } from "@/components/ui/button";
import { blogService } from "@/services/blogService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Loader2, Save } from "lucide-react";
import {
    blogFormSchema,
    BlogFormSchemaType,
} from "@/app/admin/blogs/BlogForm/blogSchema";
import BlogForm from "@/app/admin/blogs/BlogForm/BlogForm";
import { HttpError } from "@/http/helpers";

function UpdateBlogPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;
    const [isLoading, setIsLoading] = useState(true);

    const form = useForm<BlogFormSchemaType>({
        resolver: zodResolver(blogFormSchema) as any,
        defaultValues: {
            title: "",
            slug: "",
            description: "",
            content: "",
            thumbnail: "",
            categoryId: "",
            status: "active",
        },
    });

    const {
        handleSubmit,
        reset,
        formState: { isSubmitting },
    } = form;

    // 1. Fetch dữ liệu bài viết cũ
    const fetchPostDetail = async () => {
        try {
            setIsLoading(true);
            const data = await blogService.detail(id);

            // Reset form với dữ liệu từ BE
            reset({
                title: data.title,
                slug: data.slug,
                description: data.description,
                content: data.content,
                thumbnail: data.thumbnail,
                categoryId: data.category.id,
                status: data.status,
            });
        } catch (error) {
            console.error(error);
            if (error instanceof HttpError) {
                if (error.status === 409) {
                    form.setError("slug", {
                        type: "server",
                        message: "Slug đang bị trùng lặp",
                    });
                    return toast.error("Slug đang bị trùng lặp");
                }
            }
            toast.error("Không tìm thấy bài viết hoặc lỗi hệ thống");
            router.push("/admin/blogs");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (id) fetchPostDetail();
    }, [id]);

    // 2. Xử lý Update
    const onSubmit = async (data: BlogFormSchemaType) => {
        try {
            await blogService.update(id, data);
            toast.success("Cập nhật bài viết thành công!");
            router.push("/admin/blogs");
            router.refresh();
        } catch (error: any) {
            console.error(error);
            toast.error(error?.response?.data?.message || "Cập nhật thất bại");
        }
    };

    if (isLoading) {
        return (
            <div className="flex h-100 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-stone-400" />
            </div>
        );
    }

    return (
        <div className="flex h-full flex-col p-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Header Section */}
                <div className="flex items-center justify-between border-b bg-white/80 pb-4 backdrop-blur-md">
                    <div className="flex items-center gap-4">
                        <BackBtn />
                        <div>
                            <h1 className="text-xl font-bold text-stone-900">
                                Chỉnh sửa bài viết
                            </h1>
                            <p className="text-xs text-blue-600">ID: {id}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            className="rounded-none border-stone-300"
                            onClick={() => router.back()}
                            disabled={isSubmitting}
                        >
                            Hủy
                        </Button>
                        <Button
                            type="submit"
                            className="rounded-none bg-indigo-600 hover:bg-indigo-700"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Save className="mr-2 h-4 w-4" />
                            )}
                            Lưu thay đổi
                        </Button>
                    </div>
                </div>

                {/* Reuse BlogForm */}
                <div className="mx-auto max-w-5xl py-6">
                    <BlogForm form={form} />
                </div>
            </form>
        </div>
    );
}

export default UpdateBlogPage;
