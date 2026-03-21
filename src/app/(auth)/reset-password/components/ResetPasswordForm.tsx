"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, ArrowRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
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
    ResetPasswordFormValues,
    resetPasswordSchema,
} from "@/validation/authSchema";
import ErrorText from "@/app/(auth)/components/ErrorText/ErrorText";
import Logo from "@/components/Logo";
import { authService } from "@/services/authService";

export function ResetPasswordForm({
    className,
    userId,
}: {
    className?: string;
    userId: string;
}) {
    const router = useRouter();
    const [isSuccess, setIsSuccess] = useState(false);
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ResetPasswordFormValues>({
        resolver: zodResolver(resetPasswordSchema),
    });

    const onSubmit = async (data: ResetPasswordFormValues) => {
        try {
            await authService.resetPassword({
                userId: userId,
                newPassword: data.newPassword,
                token: token || "",
            });

            setIsSuccess(true);
        } catch (error) {
            toast.error("Có lỗi xảy ra, vui lòng thử lại sau.");
        }
    };

    // --- GIAO DIỆN KHI THÀNH CÔNG ---
    if (isSuccess) {
        return (
            <div
                className={cn(
                    "animate-in fade-in zoom-in flex flex-col items-center space-y-6 text-center duration-500",
                    className,
                )}
            >
                <div className="rounded-full bg-green-100 p-3 dark:bg-green-900/20">
                    <CheckCircle2 className="h-12 w-12 text-green-600 dark:text-green-400" />
                </div>
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold tracking-tight">
                        Hoàn tất!
                    </h1>
                    <p className="text-muted-foreground max-w-[280px] text-sm">
                        Mật khẩu của bạn đã được cập nhật. Bây giờ bạn có thể
                        đăng nhập bằng mật khẩu mới.
                    </p>
                </div>
                <Button
                    className="w-full"
                    onClick={() => router.push("/login")}
                >
                    Đăng nhập ngay
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
        );
    }

    // --- GIAO DIỆN FORM ĐẶT LẠI ---
    return (
        <div
            className={cn(
                "animate-in slide-in-from-top-2 flex flex-col gap-6 duration-500",
                className,
            )}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <FieldGroup className="space-y-4">
                    <div className="mb-4 flex flex-col items-center gap-2 text-center">
                        <Logo />
                        <h1 className="text-xl font-bold">Đặt lại mật khẩu</h1>
                        <FieldDescription>
                            Nhập mật khẩu mới bên dưới để bảo mật lại tài khoản.
                        </FieldDescription>
                    </div>

                    <Field>
                        <FieldLabel htmlFor="newPassword">
                            Mật khẩu mới
                        </FieldLabel>
                        <Input
                            type="password"
                            id="newPassword"
                            placeholder="••••••••"
                            className={cn(
                                errors.newPassword && "border-red-500",
                            )}
                            {...register("newPassword")}
                        />
                        <ErrorText message={errors.newPassword?.message} />
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="confirmPassword">
                            Xác nhận mật khẩu
                        </FieldLabel>
                        <Input
                            type="password"
                            id="confirmPassword"
                            placeholder="••••••••"
                            className={cn(
                                errors.confirmPassword && "border-red-500",
                            )}
                            {...register("confirmPassword")}
                        />
                        <ErrorText message={errors.confirmPassword?.message} />
                    </Field>

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Đang xử lý...
                            </>
                        ) : (
                            "Xác nhận đổi mật khẩu"
                        )}
                    </Button>
                </FieldGroup>
            </form>

            <div className="text-muted-foreground px-6 text-center text-xs">
                Khi tiếp tục, bạn đồng ý với{" "}
                <a
                    href="#"
                    className="hover:text-primary underline underline-offset-4"
                >
                    Điều khoản dịch vụ
                </a>{" "}
                và{" "}
                <a
                    href="#"
                    className="hover:text-primary underline underline-offset-4"
                >
                    Chính sách bảo mật
                </a>
                .
            </div>
        </div>
    );
}
