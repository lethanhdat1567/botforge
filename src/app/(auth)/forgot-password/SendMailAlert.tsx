"use client";

import { Button } from "@/components/ui/button";
import { authService } from "@/services/authService";
import { Mail } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function SendMailAlert({
    email = "you@example.com",
}: {
    email?: string;
}) {
    const [countdown, setCountdown] = useState(0);

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    const handleResend = async () => {
        // 1. Chặn nếu đang trong thời gian đếm ngược
        if (countdown > 0) return;

        try {
            await authService.sendTokenForgotPassword({
                email: email,
            });

            toast.success("Đã gửi lại email thành công!");

            setCountdown(60);
        } catch (error) {
            console.error("Gửi lại thất bại", error);
            toast.error("Không thể gửi lại email lúc này.");
        }
    };

    return (
        <div className="animate-in fade-in zoom-in-95 flex flex-col items-center justify-center space-y-6 py-6 duration-300">
            {/* Icon Box: Phong cách shadcn thường dùng nền muted (xám nhẹ) và icon đen/trắng */}
            <div className="bg-muted flex h-16 w-16 items-center justify-center rounded-full">
                <Mail className="text-foreground h-8 w-8" strokeWidth={1.5} />
            </div>

            {/* Typography: tracking-tight và text-balance là đặc trưng của shadcn */}
            <div className="flex flex-col items-center space-y-2 text-center">
                <h1 className="text-foreground text-2xl font-semibold tracking-tight">
                    Kiểm tra email của bạn
                </h1>
                <p className="text-muted-foreground max-w-sm text-sm text-balance">
                    Chúng tôi đã gửi liên kết đặt lại mật khẩu đến{" "}
                    <span className="text-foreground font-medium">{email}</span>
                </p>
            </div>

            {/* Actions: Nút chính (default) và nút phụ (ghost) */}
            <div className="flex w-full max-w-sm flex-col gap-2">
                <Button asChild className="w-full">
                    <a
                        href="https://mail.google.com"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Mở ứng dụng Email
                    </a>
                </Button>
                <Button variant="ghost" className="w-full" asChild>
                    <Link href="/login">Quay lại đăng nhập</Link>
                </Button>
            </div>

            {/* Resend Link: Dùng underline-offset-4 theo chuẩn shadcn */}
            <p className="text-muted-foreground text-center text-sm">
                Không nhận được email?{" "}
                {countdown > 0 ? (
                    <span>Gửi lại sau {countdown}s</span>
                ) : (
                    <button
                        type="button"
                        onClick={handleResend}
                        className="text-primary font-medium underline-offset-4 transition-colors hover:underline"
                    >
                        Gửi lại
                    </button>
                )}
            </p>
        </div>
    );
}
