"use client";

import AvatarUpload from "@/app/(private)/profile/components/FormProfile/AvatarUpload";
import formSchema from "@/app/(private)/profile/components/FormProfile/schema";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { resolveMediaSrc } from "@/lib/image";
import { profileService } from "@/services/profileService";
import { useAuthStore } from "@/store/authStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

export function FormProfile() {
    const user = useAuthStore((state) => state.user);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),

        defaultValues: {
            displayName: "",
            username: "",
            email: "",
            avatar: "",
        },
    });

    const errors = form.formState.errors;

    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            console.log("Form Errors:", errors);
        }
    }, [errors]);

    const fetchUser = async () => {
        try {
            const res = await profileService.getProfile();

            form.setValue("displayName", res.displayName || "");
            form.setValue("username", res.username || "");
            form.setValue("email", res.email || "");
            form.setValue("avatar", resolveMediaSrc(res.avatar) as string);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    async function onSubmit(data: z.infer<typeof formSchema>) {
        if (!user) return;
        try {
            await profileService.updateProfile(user?.id, {
                displayName: data.displayName,
                username: data.username,
                email: data.email,
                avatar: data.avatar as string,
            });

            fetchUser();
            toast.success("Cập nhật thông tin thành công");
        } catch (error) {
            console.log(error);
            toast.error("Đã xảy ra lỗi, vui lòng thử lại");
        }
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Controller
                name="avatar"
                control={form.control}
                render={({ field }) => (
                    <AvatarUpload
                        value={field.value || ""}
                        onChange={field.onChange}
                    />
                )}
            />
            <div className="grid grid-cols-2 gap-4">
                <Controller
                    name="displayName"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>
                                Tên hiển thị
                            </FieldLabel>
                            <Input
                                {...field}
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                                className="rounded-none font-medium"
                                placeholder="Nhập tên hiển thị của bạn"
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                <Controller
                    name="username"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>
                                Tên người dùng
                            </FieldLabel>
                            <Input
                                {...field}
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                                className="rounded-none font-medium"
                                placeholder="Nhập tên đăng nhập"
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
            </div>
            <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>
                            Địa chỉ Email
                        </FieldLabel>
                        <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            className="rounded-none font-medium"
                            placeholder="Nhập địa chỉ email"
                        />
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )}
            />
            <div className="mt-6 flex items-center justify-end">
                <Button className="rounded-none px-8 font-bold">
                    Lưu thay đổi
                </Button>
            </div>
        </form>
    );
}
