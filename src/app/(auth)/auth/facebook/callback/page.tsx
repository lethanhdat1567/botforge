"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authService } from "@/services/authService";
import { toast } from "sonner";
import { useAuthStore } from "@/store/authStore";

export default function FacebookCallbackPage() {
    const setUser = useAuthStore((state) => state.setUser);
    const params = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const http = async () => {
            try {
                const code = params.get("code");

                if (!code) {
                    toast.error("Đăng nhập Facebook thất bại!");
                    router.replace("/login" as any);
                    return;
                }

                // ✅ GỌI FACEBOOK LOGIN
                const res = await authService.socialFacebookLogin(code);

                const { user, token } = res.data;

                setUser(
                    user,
                    token.access_token,
                    token.refresh_token,
                    token.expired_in ?? 3600,
                );

                await authService.setTokenFromClientToServer({
                    accessToken: token.access_token,
                    expiredIn: token.expired_in ?? 3600,
                    role: user.role,
                });

                toast.success("Đăng nhập Facebook thành công!");

                if (user.role === "admin") {
                    router.push("/admin/dashboard" as any);
                } else {
                    router.push("/dashboard" as any);
                }
            } catch (error: any) {
                const code = error?.response?.data?.data?.code;

                if (code === "LOCAL_ACCOUNT_ONLY") {
                    toast.error(
                        "Tài khoản này đã được đăng ký bằng email & mật khẩu. Vui lòng đăng nhập thủ công.",
                    );
                    router.replace("/login" as any);
                    return;
                }

                if (code === "FACEBOOK_ACCOUNT_MISMATCH") {
                    toast.error(
                        "Email này đã được đăng ký với một tài khoản Facebook khác.",
                    );
                    router.replace("/login" as any);
                    return;
                }

                if (code === "EMAIL_REQUIRED") {
                    toast.error(
                        "Tài khoản Facebook của bạn không có email. Vui lòng thêm email hoặc dùng Google.",
                    );
                    router.replace("/login" as any);
                    return;
                }

                toast.error("Đăng nhập Facebook thất bại. Vui lòng thử lại.");
                router.replace("/login" as any);
            }
        };

        http();
    }, [params, router, setUser]);

    return (
        <div className="flex h-screen items-center justify-center">
            <p>Đang đăng nhập bằng Facebook...</p>
        </div>
    );
}
