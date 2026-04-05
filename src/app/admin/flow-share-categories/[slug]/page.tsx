"use client";

import BackBtn from "@/app/(private)/components/BackBtn/BackBtn";
import FlowShareCategoryForm from "@/app/admin/flow-share-categories/FlowShareCategoryForm/FlowShareCategoryForm";
import flowShareCategoryFormSchema, {
    FlowShareCategoryFormSchemaType,
} from "@/app/admin/flow-share-categories/FlowShareCategoryForm/schema";
import { Button } from "@/components/ui/button";
import { HttpError } from "@/http/helpers";
import { flowShareCategoryService } from "@/services/flowSharedCategoryService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

function FlowShareCategoryEditPage() {
    const router = useRouter();
    const params = useParams();
    const slugParam = params?.slug;
    const slug =
        typeof slugParam === "string"
            ? slugParam
            : Array.isArray(slugParam)
              ? slugParam[0]
              : "";

    const [isLoading, setIsLoading] = useState(true);
    const [categoryId, setCategoryId] = useState<string | null>(null);

    const form = useForm<FlowShareCategoryFormSchemaType>({
        resolver: zodResolver(flowShareCategoryFormSchema) as any,
        defaultValues: {
            name: "",
            slug: "",
        },
    });

    useEffect(() => {
        if (!slug) return;

        const fetchData = async () => {
            try {
                const res = await flowShareCategoryService.detail(slug);
                setCategoryId(res.id);
                form.reset({
                    name: res.name,
                    slug: res.slug,
                });
            } catch (error) {
                console.error(error);
                toast.error("Không thể tải dữ liệu danh mục");
                router.push("/admin/flow-share-categories");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [slug, form, router]);

    async function onSubmit(data: z.infer<typeof flowShareCategoryFormSchema>) {
        if (!categoryId) return;
        try {
            await flowShareCategoryService.update(categoryId, {
                name: data.name,
                slug: data.slug,
            });

            toast.success("Cập nhật danh mục thành công");
            router.push("/admin/flow-share-categories");
            router.refresh();
        } catch (error) {
            console.error(error);
            if (error instanceof HttpError) {
                if (error.status === 409) {
                    form.setError("slug", {
                        type: "server",
                        message: "Slug hoặc tên đã tồn tại",
                    });
                    return toast.error("Slug hoặc tên đã tồn tại");
                }
            }
            toast.error("Cập nhật thất bại");
        }
    }

    if (isLoading) {
        return (
            <div className="p-8 text-center text-sm text-stone-500">
                Đang tải dữ liệu...
            </div>
        );
    }

    return (
        <div className="min-w-0 px-0 sm:px-2">
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="min-w-0 space-y-4"
            >
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

                <div className="my-8">
                    <FlowShareCategoryForm form={form} />
                </div>
            </form>
        </div>
    );
}

export default FlowShareCategoryEditPage;
