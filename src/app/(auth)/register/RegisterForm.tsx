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
import { toast } from "sonner";
import { setFormErrors } from "@/app/(auth)/helpers";

export function SignupForm({ className }: { className?: string }) {
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
            await authService.register(data);
            toast.success("Đăng ký tài khoản thành công!");
        } catch (err: any) {
            const backendErrors = err.response?.data?.data?.errors;

            if (backendErrors && Array.isArray(backendErrors)) {
                setFormErrors<SignupFormValues>(backendErrors, setError);
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
                    <h1 className="text-2xl font-bold">Create your account</h1>
                    <p className="text-muted-foreground text-sm text-balance">
                        Fill in the form below to start your journey with us
                    </p>
                </div>

                {/* Username */}
                <Field>
                    <FieldLabel htmlFor="username">Username</FieldLabel>
                    <Input
                        id="username"
                        placeholder="Choose a unique username"
                        {...register("username")}
                    />
                    <ErrorText message={errors.username?.message} />
                </Field>

                {/* Full Name */}
                <Field>
                    <FieldLabel htmlFor="displayName">Full Name</FieldLabel>
                    <Input
                        id="displayName"
                        placeholder="Enter your full name"
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
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                        id="password"
                        type="password"
                        placeholder="Create a strong password"
                        {...register("password")}
                    />

                    <ErrorText message={errors.password?.message} />
                </Field>

                {/* Confirm Password */}
                <Field>
                    <FieldLabel htmlFor="confirmPassword">
                        Confirm Password
                    </FieldLabel>
                    <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Re-enter your password"
                        {...register("confirmPassword")}
                    />
                    <ErrorText message={errors.confirmPassword?.message} />
                </Field>

                {/* Submit */}
                <Field>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Creating..." : "Create Account"}
                    </Button>
                </Field>

                <FieldSeparator>Or continue with</FieldSeparator>

                <SocialLogin />

                <FieldDescription className="px-6 text-center">
                    Already have an account?{" "}
                    <Link href={{ pathname: "/login" }}>Sign in</Link>
                </FieldDescription>
            </FieldGroup>
        </form>
    );
}
