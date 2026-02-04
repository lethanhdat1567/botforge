import { z } from "zod";

export const signupSchema = z
    .object({
        username: z
            .string()
            .min(3, "Tên người dùng phải có ít nhất 3 ký tự")
            .max(20, "Tên người dùng tối đa 20 ký tự"),
        displayName: z.string().min(1, "Họ và tên không được để trống"),
        email: z.string().email("Địa chỉ email không hợp lệ"),
        password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
        confirmPassword: z.string().min(6, "Vui lòng xác nhận mật khẩu"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Mật khẩu xác nhận không khớp",
    });

export type SignupFormValues = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
    emailOrUsername: z
        .string()
        .min(1, "Email hoặc tên người dùng không được để trống"),
    password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const forgotPasswordSchema = z.object({
    email: z.string().email("Địa chỉ email không hợp lệ"),
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
    .object({
        newPassword: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
        confirmPassword: z.string().min(6, "Vui lòng xác nhận mật khẩu"),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Mật khẩu xác nhận không khớp",
    });

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
