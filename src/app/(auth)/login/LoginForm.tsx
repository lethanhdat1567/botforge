/* eslint-disable @typescript-eslint/no-unused-expressions */
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
import ErrorText from "@/app/(auth)/components/ErrorText/ErrorText";
import { LoginFormValues, loginSchema } from "@/validation/authSchema";
import { HttpError } from "@/http/helpers";
import { toast } from "sonner";
import { authService } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

export function LoginForm({ className }: { className?: string }) {
    const router = useRouter();
    const setAuth = useAuthStore((state) => state.setAuth);

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormValues) => {
        try {
            const res = await authService.login({
                email: data.email,
                password: data.password,
            });
            await authService.loginFromNextClientToNextServer({
                accessToken: res.accessToken,
                role: res.user.role,
                accessTokenExpiresIn: res.accessTokenExpiresIn,
                refreshToken: res.refreshToken,
            });
            setAuth({
                user: res.user,
                accessToken: res.accessToken,
                refreshToken: res.refreshToken,
                accessTokenExpiresIn: res.accessTokenExpiresIn,
            });

            res.user.role === "user"
                ? router.push("/dashboard")
                : router.push("/admin/dashboard");
            toast.success("Đăng nhập thành công!");
        } catch (error) {
            if (error instanceof HttpError) {
                if (error.status === 409) {
                    setError("email", {
                        message:
                            "Email này đã được liên kết với Google. Để thiết lập mật khẩu, vui lòng sử dụng tính năng 'Quên mật khẩu'.",
                    });
                } else if (error.status === 401) {
                    setError("email", {
                        message: "Email hoặc mật khẩu không chính xác.",
                    });
                }
            }

            toast.error("Đăng nhập thất bại!");
        }
    };

    return (
        <form
            className={cn("flex flex-col gap-6", className)}
            onSubmit={handleSubmit(onSubmit)}
        >
            <FieldGroup className="gap-4">
                <div className="mb-2 flex flex-col items-center gap-1 text-center">
                    <h1 className="text-2xl font-bold">
                        Đăng nhập vào tài khoản
                    </h1>
                    <p className="text-muted-foreground text-sm text-balance">
                        Nhập emai và mật khẩu để đăng nhập
                    </p>
                </div>

                {/* Email or Username */}
                <Field>
                    <FieldLabel htmlFor="emailOrUsername">Email</FieldLabel>
                    <Input
                        id="emailOrUsername"
                        type="text"
                        placeholder="you@example.com"
                        {...register("email")}
                    />
                    <ErrorText message={errors.email?.message} />
                </Field>

                {/* Password */}
                <Field>
                    <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
                        <FieldLabel htmlFor="password">Mật khẩu</FieldLabel>
                        <Link
                            href={{ pathname: "/forgot-password" }}
                            className="text-sm underline-offset-4 hover:underline"
                        >
                            Quên mật khẩu?
                        </Link>
                    </div>
                    <Input
                        id="password"
                        type="password"
                        placeholder="Nhập mật khẩu của bạn"
                        {...register("password")}
                    />
                    <ErrorText message={errors.password?.message} />
                </Field>

                {/* Submit */}
                <Field>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
                    </Button>
                </Field>

                <FieldSeparator className="my-1">
                    Hoặc đăng nhập bằng
                </FieldSeparator>

                {/* Social login */}
                <SocialLogin />

                <FieldDescription className="px-6 text-center">
                    Chưa có tài khoản?{" "}
                    <Link href={{ pathname: "/register" }}>Đăng ký ngay</Link>
                </FieldDescription>
            </FieldGroup>
        </form>
    );
}
