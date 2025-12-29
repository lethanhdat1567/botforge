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
import { setFormErrors } from "@/app/(auth)/helpers";
import { LoginFormValues, loginSchema } from "@/validation/authSchema";

export function LoginForm({ className }: { className?: string }) {
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
            await authService.login(data);
            toast.success("Đăng nhập thành công!");
            // Redirect nếu cần: router.push("/dashboard");
        } catch (err: any) {
            const backendErrors = err.response?.data?.data?.errors;

            if (backendErrors && Array.isArray(backendErrors)) {
                setFormErrors<LoginFormValues>(backendErrors, setError);
            } else {
                toast.error("Có lỗi xảy ra. Vui lòng thử lại!");
            }
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
