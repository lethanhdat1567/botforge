"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import ErrorText from "@/app/(auth)/components/ErrorText/ErrorText";
import { useState } from "react";
import SendMailAlert from "@/app/(auth)/forgot-password/SendMailAlert";
import Link from "next/link";
import { authService } from "@/services/authService";

export function SendMailForm({ className }: { className?: string }) {
    const [success, setSuccess] = useState(false);
    const [userEmail, setUserEmail] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ForgotPasswordFormValues>({
        resolver: zodResolver(forgotPasswordSchema),
    });

    const onSubmit = async (data: ForgotPasswordFormValues) => {
        try {
            await authService.sendTokenForgotPassword({
                email: data.email,
            });

            setUserEmail(data.email);
            setSuccess(true);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={cn("flex flex-col gap-6", className)}>
            <form onSubmit={handleSubmit(onSubmit)}>
                {success ? (
                    /* HIỂN THỊ KHI GỬI MAIL THÀNH CÔNG */
                    /* Đồng bộ hiệu ứng zoom-in-95 với shadcn */
                    <div className="animate-in fade-in zoom-in-95 duration-300">
                        <SendMailAlert email={userEmail} />
                    </div>
                ) : (
                    /* HIỂN THỊ FORM NHẬP EMAIL */
                    <FieldGroup className="gap-6">
                        {/* Header của Form: Chuẩn typography của shadcn */}
                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Quên mật khẩu
                            </h1>
                            <p className="text-muted-foreground text-sm text-balance">
                                Nhập địa chỉ email của bạn, chúng tôi sẽ gửi
                                liên kết để đặt lại mật khẩu.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <Field>
                                <FieldLabel htmlFor="email">
                                    Địa chỉ email
                                </FieldLabel>
                                <Input
                                    type="email"
                                    id="email"
                                    placeholder="name@example.com"
                                    {...register("email")}
                                    disabled={isSubmitting}
                                />
                                <ErrorText message={errors.email?.message} />
                            </Field>

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full"
                            >
                                {isSubmitting
                                    ? "Đang gửi..."
                                    : "Gửi liên kết đặt lại"}
                            </Button>
                        </div>

                        <div className="text-center">
                            <Button
                                variant="link"
                                className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
                                asChild
                            >
                                <Link href="/login">Quay lại đăng nhập</Link>
                            </Button>
                        </div>
                    </FieldGroup>
                )}
            </form>

            {!success && (
                <FieldDescription className="text-muted-foreground px-8 text-center text-sm">
                    Khi tiếp tục, bạn đồng ý với{" "}
                    <a
                        href="#"
                        className="hover:text-primary underline underline-offset-4 transition-colors"
                    >
                        Điều khoản dịch vụ
                    </a>{" "}
                    và{" "}
                    <a
                        href="#"
                        className="hover:text-primary underline underline-offset-4 transition-colors"
                    >
                        Chính sách bảo mật
                    </a>{" "}
                    của chúng tôi.
                </FieldDescription>
            )}
        </div>
    );
}
