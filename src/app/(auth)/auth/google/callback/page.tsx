"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authService } from "@/services/authService";
import { toast } from "sonner";
import { useAuthStore } from "@/store/authStore";

export default function GoogleCallbackPage() {
    const setUser = useAuthStore((state) => state.setUser);
    const params = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const http = async () => {
            try {
                const code = params.get("code");

                if (!code) {
                    toast.error("Đăng nhập thất bại!");
                    router.replace("/login" as any);
                    return;
                }

                const res = await authService.socialGoogleLogin(code);
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
                console.log(error);
                if (error.response.data.data.code === "LOCAL_ACCOUNT_ONLY") {
                    toast.error(
                        "Tài khoản của bạn đã được đăng ký thủ công. Vui lòng đăng nhập thủ công!",
                    );
                    router.push("/login" as any);
                    return;
                } else if (
                    error.response.data.data.code === "GOOGLE_ACCOUNT_MISMATCH"
                ) {
                    toast.error(
                        "Tài khoản của bạn không tìm thấy trong hệ thống đăng nhập bằng google!",
                    );
                }
                toast.error("Đã có lỗi xảy ra");
                router.push("/login" as any);
            }
        };

        http();
    }, [params, router, setUser]);

    return (
        <div className="flex h-screen items-center justify-center">
            <p>Đang đăng nhập bằng Google...</p>
        </div>
    );
}
