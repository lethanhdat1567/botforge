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
import { useSearchParams } from "next/navigation";

export function ResetPasswordForm({ className }: { className?: string }) {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

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
            toast.success("Password has been reset successfully!");
        } catch (err: any) {
            const backendErrors = err.response?.data?.data?.errors;
            if (backendErrors && Array.isArray(backendErrors)) {
                setFormErrors<ResetPasswordFormValues>(backendErrors, setError);
            } else {
                toast.error("An error occurred. Please try again!");
            }
        }
    };

    return (
        <div className={cn("flex flex-col gap-6", className)}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FieldGroup>
                    <div className="flex flex-col items-center gap-2 text-center">
                        <a
                            href="#"
                            className="flex flex-col items-center gap-2 font-medium"
                        >
                            <div className="flex size-8 items-center justify-center rounded-md">
                                <GalleryVerticalEnd className="size-6" />
                            </div>
                            <span className="sr-only">Acme Inc.</span>
                        </a>
                        <h1 className="text-xl font-bold">Reset Password</h1>
                        <FieldDescription>
                            Enter your new password below to reset your account
                            password.
                        </FieldDescription>
                    </div>

                    {/* New Password */}
                    <Field>
                        <FieldLabel htmlFor="newPassword">
                            New Password
                        </FieldLabel>
                        <Input
                            type="password"
                            id="newPassword"
                            placeholder="Enter new password"
                            {...register("newPassword")}
                        />
                        <ErrorText message={errors.newPassword?.message} />
                    </Field>

                    {/* Confirm Password */}
                    <Field>
                        <FieldLabel htmlFor="confirmPassword">
                            Confirm Password
                        </FieldLabel>
                        <Input
                            type="password"
                            id="confirmPassword"
                            placeholder="Confirm new password"
                            {...register("confirmPassword")}
                        />
                        <ErrorText message={errors.confirmPassword?.message} />
                    </Field>

                    {/* Submit */}
                    <Field>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Changing..." : "Change Password"}
                        </Button>
                    </Field>
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
