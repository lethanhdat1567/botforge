"use client";

import SharedForm from "@/app/(private)/community/store/components/SharedForm/SharedForm";
import formSchema, {
    FormSchemaType,
} from "@/app/(private)/community/store/new/form";
import BackBtn from "@/app/(private)/components/BackBtn/BackBtn";
import { Button } from "@/components/ui/button";
import flowShareService from "@/services/flowSharedService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

function CreateSharedTemplatePage() {
    const router = useRouter();

    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            name: "My Awesome Automation Flow",
            description:
                "Đây là mô tả mẫu cho quy trình chia sẻ dữ liệu tự động, giúp tối ưu hóa công việc.",
            status: "active",

            thumbnail: undefined,

            flowId: "",

            content: "Nội dung chi tiết của flow sẽ nằm ở đây...",
            categories: [],
        },
    });

    async function onSubmit(data: z.infer<typeof formSchema>) {
        // Do something with the form values.
        try {
            await flowShareService.create({
                flowId: data.flowId,
                name: data.name,
                description: data.description,
                thumbnail: data.thumbnail,
                content: data.content,
                status: data.status,
                categories: data.categories,
            });

            toast.success("Template created successfully");
            router.push("/community/store" as any);
        } catch (error) {
            console.log(error);
            toast.error("Failed to create template");
        }
    }

    return (
        <div className="min-w-0">
            {/* Heading */}
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="min-w-0 space-y-4"
            >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex min-w-0 items-center gap-2 sm:gap-4">
                        <BackBtn />
                        <h1 className="text-lg font-semibold sm:text-xl">
                            Chia sẻ mẫu cộng đồng mới
                        </h1>
                    </div>
                    <div className="flex shrink-0 flex-wrap items-center gap-2 sm:justify-end sm:gap-4">
                        <Button
                            className="flex-1 rounded-none sm:flex-initial"
                            variant={"secondary"}
                        >
                            Hủy
                        </Button>
                        <Button className="flex-1 rounded-none sm:flex-initial">
                            Lưu
                        </Button>
                    </div>
                </div>
                {/* Form */}
                <div className="my-8">
                    <SharedForm form={form} />
                </div>
            </form>
        </div>
    );
}

export default CreateSharedTemplatePage;
