"use client";

import BackBtn from "@/app/(private)/components/BackBtn/BackBtn";
import { formSchema } from "@/app/admin/blogs/new/chema";
import GuideForm from "@/app/admin/blogs/new/GuideForm";
import { Button } from "@/components/ui/button";
import { guideService } from "@/services/guideService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

function GuideCreatePage() {
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            slug: "",
            summary: "",
            content: "",
            status: "draft",
            thumbnail: undefined,
        },
    });

    async function onSubmit(data: z.infer<typeof formSchema>) {
        try {
            await guideService.create({
                title: data.title,
                slug: data.slug,
                summary: data.summary || undefined,
                content: data.content,
                status: data.status,
                thumbnail:
                    data.thumbnail instanceof File ? data.thumbnail : undefined,
            });

            toast.success("Guide created successfully");
            router.push("/guides" as any);
        } catch (error) {
            console.error(error);
            toast.error("Failed to create guide");
        }
    }

    return (
        <div className="h-screen overflow-auto">
            {/* Heading */}
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <BackBtn />
                        <h1 className="text-xl font-semibold">
                            Thêm bài viết mới
                        </h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button className="rounded-none" variant={"secondary"}>
                            Hủy
                        </Button>
                        <Button className="rounded-none">Lưu</Button>
                    </div>
                </div>
                {/* Form */}
                <div className="my-8">
                    <GuideForm form={form} />
                </div>
            </form>
        </div>
    );
}

export default GuideCreatePage;
