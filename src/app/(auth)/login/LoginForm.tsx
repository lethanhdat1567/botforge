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
import { authService } from "@/services/authService";
import { toast } from "sonner";
import { LoginFormValues, loginSchema } from "@/validation/authSchema";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

export function LoginForm({ className }: { className?: string }) {
    const setUser = useAuthStore((state) => state.setUser);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormValues) => {
        try {
            const res = await authService.login(data);
            const user = res.data.user;
            const token = res.data.token;
            setUser(
                user,
                token.access_token,
                token.refresh_token,
                token.expired_in,
            );

            await authService.setTokenFromClientToServer({
                accessToken: token.access_token,
                expiredIn: token.expired_in,
                role: user.role,
            });
            toast.success("Đăng nhập thành công!");
            if (user.role === "admin") {
                router.push("/admin/dashboard" as any);
            } else if (user.role === "user") {
                router.push("/dashboard" as any);
            }
        } catch (error: any) {
            const code = error?.response?.data?.data?.code;

            if (code === "LOCAL_ACCOUNT_ONLY") {
                toast.error(
                    "Tài khoản này đã đăng ký bằng email & mật khẩu. Vui lòng đăng nhập thủ công.",
                );
                router.replace("/login" as any);
                return;
            }

            if (code === "GOOGLE_ACCOUNT_MISMATCH") {
                toast.error(
                    "Email này đã được đăng ký với một tài khoản Google khác.",
                );
                router.replace("/login" as any);
                return;
            }

            toast.error("Đăng nhập Google thất bại. Vui lòng thử lại.");
            router.replace("/login" as any);
        }
    };

    return (
        <form
            className={cn("flex flex-col gap-6", className)}
            onSubmit={handleSubmit(onSubmit)}
        >
            <FieldGroup className="gap-4">
                <div className="flex flex-col items-center gap-1 text-center">
                    <h1 className="text-2xl font-bold">
                        Login to your account
                    </h1>
                    <p className="text-muted-foreground text-sm text-balance">
                        Enter your email or username and password to login
                    </p>
                </div>

                {/* Email or Username */}
                <Field>
                    <FieldLabel htmlFor="emailOrUsername">
                        Email or Username
                    </FieldLabel>
                    <Input
                        id="emailOrUsername"
                        type="text"
                        placeholder="you@example.com or yourusername"
                        {...register("emailOrUsername")}
                    />
                    <ErrorText message={errors.emailOrUsername?.message} />
                </Field>

                {/* Password */}
                <Field>
                    <div className="flex items-center">
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        <Link
                            href={{ pathname: "/forgot-password" }}
                            className="ml-auto text-sm underline-offset-4 hover:underline"
                        >
                            Forgot your password?
                        </Link>
                    </div>
                    <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        {...register("password")}
                    />
                    <ErrorText message={errors.password?.message} />
                </Field>

                {/* Submit */}
                <Field>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Logging in..." : "Login"}
                    </Button>
                </Field>

                <FieldSeparator>Or continue with</FieldSeparator>

                {/* Social login */}
                <SocialLogin />

                <FieldDescription className="px-6 text-center">
                    Don&apos;t have an account?{" "}
                    <Link href={{ pathname: "/register" }}>Sign up</Link>
                </FieldDescription>
            </FieldGroup>
        </form>
    );
}
