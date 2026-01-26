"use client";

import formSchema from "@/app/(private)/community/store/[id]/edit/form";
import SharedForm from "@/app/(private)/community/store/components/SharedForm/SharedForm";
import BackBtn from "@/app/(private)/components/BackBtn/BackBtn";
import { Button } from "@/components/ui/button";
import { flowSharedService } from "@/services/flowSharedService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

function UpdateSharedTemplatePage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            desc: "",
            status: "active",
            flowId: "",
        },
    });

    useEffect(() => {
        if (!id) {
            router.push("/community/store" as any);
        }
        const http = async () => {
            const res = await flowSharedService.getSharedById(id);

            form.setValue("name", res.data.data.name);
            form.setValue("desc", res.data.data.description);
            form.setValue("status", res.data.data.status);
            form.setValue("flowId", res.data.data.flowId);
            form.setValue("thumbnail", res.data.data.thumbnail);
        };

        if (id) {
            http();
        }
    }, [id]);

    async function onSubmit(data: z.infer<typeof formSchema>) {
        // Do something with the form values.
        try {
            await flowSharedService.updateShared(id, {
                flowId: data.flowId,
                name: data.name,
                description: data.desc,
                thumbnail: data.thumbnail as File,
            });

            toast.success("Template updated successfully");
            router.push("/community/store" as any);
        } catch (error) {
            console.log(error);
            toast.error("Failed to update template");
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
                            Update shared template
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

export default UpdateSharedTemplatePage;
