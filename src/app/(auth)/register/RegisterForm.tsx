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
    FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import SocialLogin from "@/app/(auth)/components/SocialLogin/SocialLogin";
import Link from "next/link";
import { SignupFormValues, signupSchema } from "@/validation/authSchema";
import ErrorText from "@/app/(auth)/components/ErrorText/ErrorText";
import { authService } from "@/services/authService";
import { HttpError } from "@/http/helpers";
import { useState } from "react";

export function SignupForm({ className }: { className?: string }) {
    const [isSendMailAlert, setIsSendMailAlert] = useState(false);

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<SignupFormValues>({
        resolver: zodResolver(signupSchema),
    });

    const onSubmit = async (data: SignupFormValues) => {
        try {
            const payload = {
                email: data.email,
                password: data.password,
                displayName: data.displayName,
            };

            await authService.register(payload);
            setIsSendMailAlert(true);
        } catch (error) {
            if (error instanceof HttpError) {
                if (error.status === 409) {
                    setError("email", {
                        message: "Tài khoản đã tồn tại.",
                    });
                }
            }
        }
    };

    return (
        <form
            className={cn("flex flex-col gap-6", className)}
            onSubmit={handleSubmit(onSubmit)}
        >
            {isSendMailAlert ? (
                <div className="animate-in fade-in zoom-in flex flex-col items-center gap-4 py-8 text-center duration-300">
                    <div className="bg-primary/10 flex h-20 w-20 items-center justify-center rounded-full">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="text-primary h-10 w-10"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                            />
                        </svg>
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold">
                            Kiểm tra Email của bạn
                        </h2>
                        <p className="text-muted-foreground text-sm">
                            Chúng tôi đã gửi một liên kết xác thực đến email của
                            bạn. Vui lòng kiểm tra hộp thư (bao gồm cả thư rác).
                        </p>
                    </div>
                    <Button
                        variant="outline"
                        className="mt-4"
                        onClick={() => setIsSendMailAlert(false)}
                    >
                        Quay lại đăng ký
                    </Button>
                </div>
            ) : (
                <FieldGroup className="gap-4">
                    <div className="flex flex-col items-center gap-1 text-center">
                        <h1 className="text-2xl font-bold">
                            Tạo tài khoản của bạn
                        </h1>
                        <p className="text-muted-foreground text-sm text-balance">
                            Điền thông tin bên dưới để bắt đầu sử dụng dịch vụ
                        </p>
                    </div>

                    {/* Display Name */}
                    <Field>
                        <FieldLabel htmlFor="displayName">Họ và tên</FieldLabel>
                        <Input
                            id="displayName"
                            placeholder="Nhập họ và tên của bạn"
                            {...register("displayName")}
                        />
                        <ErrorText message={errors.displayName?.message} />
                    </Field>

                    {/* Email */}
                    <Field>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            {...register("email")}
                        />
                        <ErrorText message={errors.email?.message} />
                    </Field>

                    {/* Password */}
                    <Field>
                        <FieldLabel htmlFor="password">Mật khẩu</FieldLabel>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Tạo mật khẩu mạnh"
                            {...register("password")}
                        />
                        <ErrorText message={errors.password?.message} />
                    </Field>

                    {/* Confirm Password */}
                    <Field>
                        <FieldLabel htmlFor="confirmPassword">
                            Xác nhận mật khẩu
                        </FieldLabel>
                        <Input
                            id="confirmPassword"
                            type="password"
                            placeholder="Nhập lại mật khẩu"
                            {...register("confirmPassword")}
                        />
                        <ErrorText message={errors.confirmPassword?.message} />
                    </Field>

                    {/* Submit */}
                    <Field>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting
                                ? "Đang tạo tài khoản..."
                                : "Tạo tài khoản"}
                        </Button>
                    </Field>

                    <FieldSeparator className="my-1">
                        Hoặc tiếp tục với
                    </FieldSeparator>

                    <SocialLogin />

                    <FieldDescription className="px-6 text-center">
                        Đã có tài khoản?{" "}
                        <Link href={{ pathname: "/login" }}>Đăng nhập</Link>
                    </FieldDescription>
                </FieldGroup>
            )}
        </form>
    );
}
