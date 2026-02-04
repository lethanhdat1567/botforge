"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
    forgotPasswordSchema,
    ForgotPasswordFormValues,
} from "@/validation/authSchema";
import { authService } from "@/services/authService";
import { setFormErrors } from "@/app/(auth)/helpers";
import ErrorText from "@/app/(auth)/components/ErrorText/ErrorText";
import { useState } from "react";
import SendMailAlert from "@/app/(auth)/forgot-password/SendMailAlert";

export function SendMailForm({ className }: { className?: string }) {
    const [success, setSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<ForgotPasswordFormValues>({
        resolver: zodResolver(forgotPasswordSchema),
    });

    const onSubmit = async (data: ForgotPasswordFormValues) => {
        try {
            await authService.forgotPassword(data);
            toast.success(
                "Liên kết đặt lại mật khẩu đã được gửi đến email của bạn!",
            );
            setSuccess(true);
        } catch (err: any) {
            const backendErrors = err.response?.data?.data?.errors;

            if (backendErrors && Array.isArray(backendErrors)) {
                setFormErrors<ForgotPasswordFormValues>(
                    backendErrors,
                    setError,
                );
            } else {
                toast.error("Có lỗi xảy ra. Vui lòng thử lại!");
            }
        }
    };

    return (
        <div className={cn("flex flex-col gap-6", className)}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FieldGroup>
                    <div className="flex flex-col items-center gap-2 text-center">
                        <h1 className="text-xl font-bold">Quên mật khẩu</h1>
                        <FieldDescription>
                            Nhập địa chỉ email của bạn, chúng tôi sẽ gửi cho bạn
                            liên kết để đặt lại mật khẩu.
                        </FieldDescription>
                    </div>

                    {success ? (
                        <SendMailAlert />
                    ) : (
                        <>
                            <Field>
                                <FieldLabel htmlFor="email">
                                    Địa chỉ email
                                </FieldLabel>
                                <Input
                                    type="email"
                                    id="email"
                                    placeholder="you@example.com"
                                    {...register("email")}
                                />
                                <ErrorText message={errors.email?.message} />
                                <FieldDescription className="text-center">
                                    Chúng tôi sẽ gửi liên kết đặt lại mật khẩu
                                    đến email này.
                                </FieldDescription>
                            </Field>

                            <Field>
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting
                                        ? "Đang gửi..."
                                        : "Gửi liên kết đặt lại"}
                                </Button>
                            </Field>
                        </>
                    )}
                </FieldGroup>
            </form>

            <FieldDescription className="px-6 text-center">
                Khi tiếp tục, bạn đồng ý với <a href="#">Điều khoản dịch vụ</a>{" "}
                và <a href="#">Chính sách bảo mật</a> của chúng tôi.
            </FieldDescription>
        </div>
    );
}
