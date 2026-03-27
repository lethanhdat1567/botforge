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
            title: "Hướng dẫn lập trình Next.js 14 cho người mới bắt đầu",
            slug: "huong-dan-lap-trinh-nextjs-14-cho-nguoi-moi-bat-dau",
            description:
                "Khám phá những tính năng mới nhất của Next.js 14 bao gồm App Router, Server Actions và tối ưu hóa hiệu suất ứng dụng web của bạn.",
            content: `
            <h2>1. Giới thiệu về Next.js 14</h2>
            <p>Next.js 14 mang đến những cải tiến vượt bậc về hiệu năng...</p>
            <ul>
                <li>Server Actions</li>
                <li>Partial Prerendering</li>
                <li>Tối ưu hóa Image và Font</li>
            </ul>
            <p>Hãy cùng tìm hiểu chi tiết trong bài viết này.</p>
        `,
            thumbnail:
                "https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=1000&auto=format&fit=crop",
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
        <div className="flex h-full flex-col p-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Sticky Header */}
                <div className="flex items-center justify-between bg-white/80 pb-4 backdrop-blur-md">
                    <div className="flex items-center gap-4">
                        <BackBtn />
                        <div>
                            <h1 className="text-xl font-bold text-stone-900">
                                Viết bài mới
                            </h1>
                            <p className="text-xs text-stone-500">
                                Thiết lập nội dung và cấu hình bài viết
                            </p>
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
                            className="rounded-none bg-blue-600 hover:bg-blue-700"
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
