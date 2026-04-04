"use client";

import BackBtn from "@/app/(private)/components/BackBtn/BackBtn";
import { Button } from "@/components/ui/button";
import { blogService } from "@/services/blogService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Loader2, Send } from "lucide-react";
import {
    blogFormSchema,
    BlogFormSchemaType,
} from "@/app/admin/blogs/BlogForm/blogSchema";
import BlogForm from "@/app/admin/blogs/BlogForm/BlogForm";
import { HttpError } from "@/http/helpers";

function CreateBlogPage() {
    const router = useRouter();

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
        formState: { isSubmitting },
    } = form;

    const onSubmit = async (data: BlogFormSchemaType) => {
        try {
            // Payload gửi lên BE đúng định dạng CreatePost
            await blogService.create({
                title: data.title,
                slug: data.slug,
                description: data.description,
                content: data.content || "",
                thumbnail: data.thumbnail,
                categoryId: data.categoryId,
                status: data.status,
            });

            toast.success("Tạo bài viết thành công!");
            router.push("/admin/blogs");
            router.refresh();
        } catch (error: any) {
            console.error("Submit Error:", error);
            if (error instanceof HttpError) {
                if (error.status === 409) {
                    form.setError("slug", {
                        type: "server",
                        message: "Slug đang bị trùng lặp",
                    });
                    return toast.error("Slug đang bị trùng lặp");
                }
            }
            toast.error(
                error?.response?.data?.message ||
                    "Lỗi hệ thống khi tạo bài viết",
            );
        }
    };

    return (
        <div className="flex min-h-0 w-full min-w-0 flex-col px-0 py-0 sm:px-2">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="min-w-0 space-y-6"
            >
                {/* Sticky Header */}
                <div className="flex flex-col gap-4 bg-white/80 pb-4 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex min-w-0 items-center gap-2 sm:gap-4">
                        <BackBtn />
                        <div className="min-w-0">
                            <h1 className="text-lg font-bold text-stone-900 sm:text-xl">
                                Viết bài mới
                            </h1>
                            <p className="text-xs text-stone-500">
                                Thiết lập nội dung và cấu hình bài viết
                            </p>
                        </div>
                    </div>

                    <div className="flex shrink-0 flex-wrap items-center gap-2 sm:gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            className="flex-1 rounded-none border-stone-300 sm:flex-initial"
                            onClick={() => router.back()}
                            disabled={isSubmitting}
                        >
                            Hủy
                        </Button>
                        <Button
                            type="submit"
                            className="flex-1 rounded-none bg-blue-600 hover:bg-blue-700 sm:flex-initial"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Send className="mr-2 h-4 w-4" />
                            )}
                            Xuất bản
                        </Button>
                    </div>
                </div>

                {/* Form Content */}
                <BlogForm form={form} />
            </form>
        </div>
    );
}

export default CreateBlogPage;
