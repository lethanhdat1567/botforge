"use client";

import BlogCategoryForm from "@/app/admin/blog-category/BlogCategoryForm/BlogCategoryForm";
import blogCategoryFormSchema, {
    BlogCategoryFormSchemaType,
} from "@/app/admin/blog-category/BlogCategoryForm/schema";
import BackBtn from "@/app/(private)/components/BackBtn/BackBtn";
import { Button } from "@/components/ui/button";
import { postCategoryService } from "@/services/blogCategoryService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { HttpError } from "@/http/helpers";

function BlogCategoryUpdatePage() {
    const router = useRouter();
    const { id } = useParams() as { id: string };
    const [isLoading, setIsLoading] = useState(true);

    const form = useForm<BlogCategoryFormSchemaType>({
        resolver: zodResolver(blogCategoryFormSchema) as any,
        defaultValues: {
            name: "",
            slug: "",
        },
    });

    useEffect(() => {
        if (!id) return;

        const fetchData = async () => {
            try {
                const res = await postCategoryService.detail(id);

                // Điền dữ liệu vào form sau khi fetch thành công
                form.reset({
                    name: res.name,
                    slug: res.slug,
                });
            } catch (error) {
                if (error instanceof HttpError) {
                    if (error.status === 409) {
                        form.setError("slug", {
                            type: "server",
                            message: "Slug đang bị trùng lặp",
                        });
                        return toast.error("Slug đang bị trùng lặp");
                    }
                }
                console.error(error);
                toast.error("Không thể tải dữ liệu danh mục");
                router.push("/admin/blog-category"); // Điều hướng về danh sách nếu lỗi
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id, form, router]);

    async function onSubmit(data: z.infer<typeof blogCategoryFormSchema>) {
        try {
            await postCategoryService.update(id, {
                name: data.name,
                slug: data.slug,
            });

            toast.success("Cập nhật danh mục thành công");
            router.push("/admin/blog-category");
            router.refresh(); // Refresh dữ liệu mới nhất
        } catch (error) {
            console.error(error);
            toast.error("Cập nhật thất bại");
        }
    }

    if (isLoading)
        return (
            <div className="p-8 text-center text-sm text-stone-500">
                Đang tải dữ liệu...
            </div>
        );

    return (
        <div className="min-w-0 px-0 sm:px-2">
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="min-w-0 space-y-4"
            >
                {/* Heading */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex min-w-0 items-center gap-2 sm:gap-4">
                        <BackBtn />
                        <h1 className="text-lg font-semibold text-stone-800 sm:text-xl">
                            Chỉnh sửa danh mục
                        </h1>
                    </div>
                    <div className="flex shrink-0 flex-wrap items-center gap-2 sm:gap-4">
                        <Button
                            type="button"
                            variant="secondary"
                            className="flex-1 rounded-none sm:flex-initial"
                            onClick={() => router.back()}
                        >
                            Hủy bỏ
                        </Button>
                        <Button
                            type="submit"
                            className="flex-1 rounded-none sm:flex-initial"
                        >
                            Lưu thay đổi
                        </Button>
                    </div>
                </div>

                {/* Form Body */}
                <div className="my-8">
                    <BlogCategoryForm form={form} />
                </div>
            </form>
        </div>
    );
}

export default BlogCategoryUpdatePage;
