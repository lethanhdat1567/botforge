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
            });

            toast.success("Template created successfully");
            router.push("/community/store" as any);
        } catch (error) {
            console.log(error);
            toast.error("Failed to create template");
        }
    }

    return (
        <div className="">
            {/* Heading */}
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <BackBtn />
                        <h1 className="text-xl font-semibold">
                            Chia sẻ mẫu cộng đồng mới
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
                    <SharedForm form={form} />
                </div>
            </form>
        </div>
    );
}

export default CreateSharedTemplatePage;
