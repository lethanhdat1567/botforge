"use client";

import SharedForm from "@/app/(private)/community/store/components/SharedForm/SharedForm";
import formSchema from "@/app/(private)/community/store/new/form";
import BackBtn from "@/app/(private)/components/BackBtn/BackBtn";
import { Button } from "@/components/ui/button";
import { flowSharedService } from "@/services/flowSharedService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

function CreateSharedTemplatePage() {
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            desc: "",
            status: "active",
            flowId: "",
        },
    });

    async function onSubmit(data: z.infer<typeof formSchema>) {
        // Do something with the form values.
        try {
            await flowSharedService.createShared({
                flowId: data.flowId,
                name: data.name,
                description: data.desc,
                thumbnail: data.thumbnail,
            });

            toast.success("Template created successfully");
            router.push("/community/store" as any);
        } catch (error) {
            console.log(error);
            toast.error("Failed to create template");
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
                            Add shared template
                        </h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button className="rounded-none" variant={"secondary"}>
                            Discard
                        </Button>
                        <Button className="rounded-none">Save</Button>
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
