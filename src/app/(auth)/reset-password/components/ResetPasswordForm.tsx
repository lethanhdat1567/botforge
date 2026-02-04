"use client";

import { GalleryVerticalEnd } from "lucide-react";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorText from "@/app/(auth)/components/ErrorText/ErrorText";
import { authService } from "@/services/authService";
import { toast } from "sonner";
import { setFormErrors } from "@/app/(auth)/helpers";
import { useRouter, useSearchParams } from "next/navigation";
import Logo from "@/components/Logo";

export function ResetPasswordForm({ className }: { className?: string }) {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const router = useRouter();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<ResetPasswordFormValues>({
        resolver: zodResolver(resetPasswordSchema),
    });

    const onSubmit = async (data: ResetPasswordFormValues) => {
        try {
            await authService.resetPassword({ ...data, token: token || "" });
            toast.success("Đặt lại mật khẩu thành công!");
            router.push("/login" as any);
        } catch (err: any) {
            const backendErrors = err.response?.data?.data?.errors;
            if (backendErrors && Array.isArray(backendErrors)) {
                setFormErrors<ResetPasswordFormValues>(backendErrors, setError);
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
                        <Logo />
                        <h1 className="text-xl font-bold">Đặt lại mật khẩu</h1>
                        <FieldDescription>
                            Nhập mật khẩu mới bên dưới để đặt lại mật khẩu cho
                            tài khoản của bạn.
                        </FieldDescription>
                    </div>

                    {/* New Password */}
                    <Field>
                        <FieldLabel htmlFor="newPassword">
                            Mật khẩu mới
                        </FieldLabel>
                        <Input
                            type="password"
                            id="newPassword"
                            placeholder="Nhập mật khẩu mới"
                            {...register("newPassword")}
                        />
                        <ErrorText message={errors.newPassword?.message} />
                    </Field>

                    {/* Confirm Password */}
                    <Field>
                        <FieldLabel htmlFor="confirmPassword">
                            Xác nhận mật khẩu
                        </FieldLabel>
                        <Input
                            type="password"
                            id="confirmPassword"
                            placeholder="Nhập lại mật khẩu mới"
                            {...register("confirmPassword")}
                        />
                        <ErrorText message={errors.confirmPassword?.message} />
                    </Field>

                    {/* Submit */}
                    <Field>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Đang thay đổi..." : "Đổi mật khẩu"}
                        </Button>
                    </Field>
                </FieldGroup>
            </form>

            <FieldDescription className="px-6 text-center">
                Khi tiếp tục, bạn đồng ý với <a href="#">Điều khoản dịch vụ</a>{" "}
                và <a href="#">Chính sách bảo mật</a> của chúng tôi.
            </FieldDescription>
        </div>
    );
}
