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
        <div className="min-w-0">
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="min-w-0 space-y-4"
            >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex min-w-0 items-center gap-2 sm:gap-4">
                        <BackBtn />
                        <h1 className="text-lg font-semibold sm:text-xl">
                            Thêm danh mục blog mới
                        </h1>
                    </div>
                    <div className="flex shrink-0 flex-wrap items-center gap-2 sm:gap-4">
                        <Button
                            type="button"
                            className="flex-1 rounded-none sm:flex-initial"
                            variant={"secondary"}
                            onClick={() => router.back()}
                        >
                            Hủy
                        </Button>
                        <Button
                            type="submit"
                            className="flex-1 rounded-none sm:flex-initial"
                        >
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
