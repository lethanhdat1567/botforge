/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Loader2, CheckCircle2, XCircle, MailQuestion } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { HttpError } from "@/http/helpers";
import { authService } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";

type VerifyStatus = "loading" | "success" | "error";

function VerifyEmail() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const setAuth = useAuthStore((state) => state.setAuth);
    const [status, setStatus] = useState<VerifyStatus>("success");

    useEffect(() => {
        if (!token) return;

        const verify = async () => {
            try {
                setStatus("loading");
                const res = await authService.verifyEmail({ token });

                await authService.loginFromNextClientToNextServer({
                    accessToken: res.accessToken,
                    role: res.user.role,
                    accessTokenExpiresIn: res.accessTokenExpiresIn,
                    refreshToken: res.refreshToken,
                });
                setAuth({
                    user: res.user,
                    accessToken: res.accessToken,
                    refreshToken: res.refreshToken,
                    accessTokenExpiresIn: res.accessTokenExpiresIn,
                });
                setStatus("success");

                res.user.role === "user"
                    ? router.push("/dashboard")
                    : router.push("/admin/dashboard");
            } catch (error) {
                console.error("ERROR:", error);

                if (error instanceof HttpError) {
                    console.log("Status:", error.status);
                    setStatus("error");
                } else {
                    setStatus("error");
                }
            }
        };

        verify();
    }, [token]);
    return (
        <div className="animate-in fade-in flex min-h-svh w-full min-w-0 flex-col items-center justify-center gap-6 px-4 py-6 text-center duration-500 sm:px-6 md:px-10">
            {/* 1. TRẠNG THÁI ĐANG XÁC THỰC */}
            {status === "loading" && (
                <div className="flex flex-col items-center gap-4">
                    <div className="relative">
                        <Loader2 className="text-primary h-16 w-16 animate-spin" />
                        <MailQuestion className="text-primary absolute top-1/2 left-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2" />
                    </div>
                    <div className="w-full max-w-md space-y-2">
                        <h1 className="text-xl font-bold sm:text-2xl">
                            Đang xác thực Email
                        </h1>
                        <p className="text-muted-foreground text-sm text-balance">
                            Vui lòng đợi trong giây lát, chúng tôi đang kiểm tra
                            mã xác thực của bạn.
                        </p>
                    </div>
                </div>
            )}

            {/* 2. TRẠNG THÁI THÀNH CÔNG */}
            {status === "success" && (
                <div className="animate-in fade-in zoom-in flex flex-col items-center gap-6 duration-500">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                        <CheckCircle2 className="h-12 w-12 text-green-600 dark:text-green-400" />
                    </div>

                    <div className="w-full max-w-md space-y-2 text-center">
                        <h1 className="text-xl font-bold text-green-600 sm:text-2xl dark:text-green-400">
                            Xác thực thành công!
                        </h1>
                        <p className="text-muted-foreground mx-auto text-sm text-balance">
                            Email của bạn đã được xác minh. Bây giờ bạn có thể
                            trải nghiệm đầy đủ dịch vụ của chúng tôi.
                        </p>
                    </div>

                    <div className="flex w-full max-w-[200px] flex-col items-center gap-2">
                        <p className="text-muted-foreground text-xs italic">
                            Tự động chuyển trang sau vài giây...
                        </p>
                    </div>

                    {/* Nút bấm dự phòng nếu redirect quá lâu */}
                    <Button
                        asChild
                        variant="ghost"
                        className="text-xs underline"
                    >
                        <Link href="/login">Chuyển trang thủ công</Link>
                    </Button>
                </div>
            )}

            {/* 3. TRẠNG THÁI THẤT BẠI (Lỗi/Hết hạn) */}
            {status === "error" && (
                <div className="flex flex-col items-center gap-4">
                    <div className="bg-destructive/10 flex h-20 w-20 items-center justify-center rounded-full">
                        <XCircle className="text-destructive h-12 w-12" />
                    </div>
                    <div className="w-full max-w-md space-y-2">
                        <h1 className="text-xl font-bold sm:text-2xl">
                            Xác thực thất bại
                        </h1>
                        <p className="text-muted-foreground text-sm text-balance">
                            Mã xác thực đã hết hạn hoặc không hợp lệ. Vui lòng
                            yêu cầu một mã mới.
                        </p>
                    </div>
                    <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                        <Button variant="outline" asChild>
                            <Link href="/register">Quay lại đăng ký</Link>
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default VerifyEmail;
