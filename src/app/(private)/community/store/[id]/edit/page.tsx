"use client";

import SharedForm from "@/app/(private)/community/store/components/SharedForm/SharedForm";
import formSchema, {
    FormSchemaType,
} from "@/app/(private)/community/store/new/form";
import BackBtn from "@/app/(private)/components/BackBtn/BackBtn";
import { Button } from "@/components/ui/button";
import flowShareService from "@/services/flowSharedService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

function UpdateSharedTemplatePage() {
    const router = useRouter();
    const { id } = useParams() as { id: string };
    const [isLoading, setIsLoading] = useState(true);

    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            name: "",
            description: "",
            status: "active",
            flowId: "",
            thumbnail: null,
            content: "",
        },
    });

    useEffect(() => {
        if (!id) return;

        const fetchData = async () => {
            try {
                const res = await flowShareService.getDetail(id);
                console.log("run here");

                form.reset({
                    name: res.name,
                    description: res.description,
                    status: res.status,
                    flowId: res.flowId,
                    thumbnail: res.thumbnail,
                    content: res.content || "",
                });
            } catch (error) {
                toast.error("Could not fetch template data");
                router.push("/community/store" as any);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id, form, router]);

    async function onSubmit(data: z.infer<typeof formSchema>) {
        try {
            const payload = {
                flowId: data.flowId,
                name: data.name,
                description: data.description,
                content: data.content,
                status: data.status,
                thumbnail: data.thumbnail,
            };

            await flowShareService.update(id, payload);

            toast.success("Template updated successfully");
            router.push("/community/store" as any);
        } catch (error) {
            console.error(error);
            toast.error("Failed to update template");
        }
    }

    if (isLoading) return <div className="p-8 text-center">Loading...</div>;

    return (
        <div className="h-screen overflow-auto p-4">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/* Heading */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <BackBtn />
                        <h1 className="text-xl font-semibold text-neutral-800">
                            Update shared template
                        </h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button
                            type="button"
                            variant="secondary"
                            className="rounded-none"
                            onClick={() => router.back()}
                        >
                            Discard
                        </Button>
                        <Button type="submit" className="rounded-none">
                            Save Changes
                        </Button>
                    </div>
                </div>

                {/* Form Body */}
                <div className="my-8">
                    <SharedForm form={form} />
                </div>
            </form>
        </div>
    );
}

export default UpdateSharedTemplatePage;
