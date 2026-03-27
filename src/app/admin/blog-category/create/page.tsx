"use client";

import BackBtn from "@/app/(private)/components/BackBtn/BackBtn";
import BlogCategoryForm from "@/app/admin/blog-category/BlogCategoryForm/BlogCategoryForm";
import blogCategoryFormSchema, {
    BlogCategoryFormSchemaType,
} from "@/app/admin/blog-category/BlogCategoryForm/schema";
import { Button } from "@/components/ui/button";
import { HttpError } from "@/http/helpers";
import { postCategoryService } from "@/services/blogCategoryService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

function BlogCategoryCreatePage() {
    const router = useRouter();

    const form = useForm<BlogCategoryFormSchemaType>({
        resolver: zodResolver(blogCategoryFormSchema) as any,
        defaultValues: {
            name: "",
            slug: "",
        },
    });

    async function onSubmit(data: z.infer<typeof blogCategoryFormSchema>) {
        try {
            await postCategoryService.create({
                name: data.name,
                slug: data.slug,
            });

            toast.success("Tạo danh mục thành công");
            router.push("/admin/blog-category");
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
            toast.error("Không thể tạo danh mục");
        }
    }

    return (
        <div>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <BackBtn />
                        <h1 className="text-xl font-semibold">
                            Thêm danh mục blog mới
                        </h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button
                            type="button"
                            className="rounded-none"
                            variant={"secondary"}
                            onClick={() => router.back()}
                        >
                            Hủy
                        </Button>
                        <Button type="submit" className="rounded-none">
                            Lưu
                        </Button>
                    </div>
                </div>

                <div className="my-8">
                    <BlogCategoryForm form={form} />
                </div>
            </form>
        </div>
    );
}

export default BlogCategoryCreatePage;
