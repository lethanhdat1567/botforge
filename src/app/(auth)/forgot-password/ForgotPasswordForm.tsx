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
import { set } from "zod";

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
            toast.success("Password reset link has been sent to your email!");
            setSuccess(true);
        } catch (err: any) {
            const backendErrors = err.response?.data?.data?.errors;

            if (backendErrors && Array.isArray(backendErrors)) {
                setFormErrors<ForgotPasswordFormValues>(
                    backendErrors,
                    setError,
                );
            } else {
                toast.error("Something went wrong. Please try again!");
            }
        }
    };

    return (
        <div className={cn("flex flex-col gap-6", className)}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FieldGroup>
                    <div className="flex flex-col items-center gap-2 text-center">
                        <h1 className="text-xl font-bold">Forgot Password</h1>
                        <FieldDescription>
                            Enter your email address and we&apos;ll send you a
                            link to reset your password.
                        </FieldDescription>
                    </div>

                    {success ? (
                        <SendMailAlert />
                    ) : (
                        <>
                            <Field>
                                <FieldLabel htmlFor="email">
                                    Email address
                                </FieldLabel>
                                <Input
                                    type="email"
                                    id="email"
                                    placeholder="you@example.com"
                                    {...register("email")}
                                />
                                <ErrorText message={errors.email?.message} />
                                <FieldDescription className="text-center">
                                    We will send a password reset link to this
                                    email.
                                </FieldDescription>
                            </Field>

                            <Field>
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting
                                        ? "Sending..."
                                        : "Send Reset Link"}
                                </Button>
                            </Field>
                        </>
                    )}
                </FieldGroup>
            </form>

            <FieldDescription className="px-6 text-center">
                By clicking continue, you agree to our{" "}
                <a href="#">Terms of Service</a> and{" "}
                <a href="#">Privacy Policy</a>.
            </FieldDescription>
        </div>
    );
}
