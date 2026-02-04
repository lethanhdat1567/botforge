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
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

export function SignupForm({ className }: { className?: string }) {
    const setUser = useAuthStore((state) => state.setUser);
    const router = useRouter();

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
            const res = await authService.register(data);
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

            toast.success("Tạo tài khoản thành công!");

            if (user.role === "admin") {
                router.push("/admin/dashboard" as any);
            } else if (user.role === "user") {
                router.push("/dashboard" as any);
            }
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
                    <h1 className="text-2xl font-bold">
                        Tạo tài khoản của bạn
                    </h1>
                    <p className="text-muted-foreground text-sm text-balance">
                        Điền thông tin bên dưới để bắt đầu sử dụng dịch vụ
                    </p>
                </div>

                {/* Username */}
                <Field>
                    <FieldLabel htmlFor="username">Tên người dùng</FieldLabel>
                    <Input
                        id="username"
                        placeholder="Chọn một tên người dùng duy nhất"
                        {...register("username")}
                    />
                    <ErrorText message={errors.username?.message} />
                </Field>

                {/* Full Name */}
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
        </form>
    );
}
