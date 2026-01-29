"use client";

import AvatarUpload from "@/app/(private)/profile/components/FormProfile/AvatarUpload";
import formSchema from "@/app/(private)/profile/components/FormProfile/schema";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { resolveMediaSrc } from "@/lib/image";
import { profileService } from "@/services/profileService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

export function FormProfile() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            displayName: "",
            avatar: null,
        },
    });

    const fetchUser = async () => {
        try {
            const res = await profileService.getProfile();

            form.setValue("displayName", res.data.displayName);
            form.setValue("avatar", resolveMediaSrc(res.data.avatar) as string);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    async function onSubmit(data: z.infer<typeof formSchema>) {
        console.log(data);

        // Do something with the form values.
        try {
            await profileService.updateProfile({
                displayName: data.displayName,
                avatar: data.avatar as File,
            });

            fetchUser();
            toast.success("Updated successfully");
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <Controller
                name="avatar"
                control={form.control}
                render={({ field }) => (
                    <AvatarUpload
                        value={field.value || ""}
                        onChange={field.onChange}
                        src={undefined /* user.avatar từ BE */}
                    />
                )}
            />
            <Controller
                name="displayName"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>
                            Display name
                        </FieldLabel>
                        <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            className="rounded-none"
                        />
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )}
            />
            <div className="mt-6 flex items-center justify-end">
                <Button className="rounded-none">Save</Button>
            </div>
        </form>
    );
}
