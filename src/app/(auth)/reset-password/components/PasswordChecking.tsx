"use client";

import { useEffect, useState } from "react";
import { AlertCircle, Loader2, ArrowLeft, RefreshCcw } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button"; // Đảm bảo bạn đã cài button
import { useSearchParams, useRouter } from "next/navigation";
import { authService } from "@/services/authService";

interface PasswordCheckingProps {
    setIsValidToken: React.Dispatch<React.SetStateAction<boolean>>;
    setUserId: React.Dispatch<React.SetStateAction<string>>;
}

function PasswordChecking({
    setIsValidToken,
    setUserId,
}: PasswordCheckingProps) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get("token");

    const [errorMessage, setErrorMessage] = useState("");
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        const verifyToken = async () => {
            if (!token) {
                setErrorMessage(
                    "Đường dẫn xác thực không đầy đủ hoặc đã bị chỉnh sửa.",
                );
                setChecking(false);
                return;
            }

            try {
                const res = await authService.verifyResetPassword({
                    token: token,
                });
                setUserId(res.userId);
                setIsValidToken(true);
            } catch (error: any) {
                setErrorMessage(
                    "Liên kết này đã hết hạn hoặc không còn hiệu lực. Vui lòng yêu cầu một mã mới.",
                );
                setIsValidToken(false);
            } finally {
                setChecking(false);
            }
        };

        verifyToken();
    }, [token, setIsValidToken, setUserId]);

    return (
        <div className="flex min-h-[200px] w-full items-center justify-center">
            {checking ? (
                <div className="animate-in fade-in zoom-in flex flex-col items-center justify-center space-y-4 p-4 duration-300">
                    <Loader2 className="text-primary h-10 w-10 animate-spin opacity-80" />
                    <div className="text-center">
                        <p className="text-sm font-semibold">Đang xác thực</p>
                        <p className="text-muted-foreground text-xs">
                            Vui lòng đợi trong giây lát...
                        </p>
                    </div>
                </div>
            ) : errorMessage ? (
                <div className="animate-in slide-in-from-bottom-4 fade-in w-full max-w-md duration-500">
                    <Alert
                        variant="destructive"
                        className="border-destructive/50 bg-destructive/5"
                    >
                        <AlertCircle className="h-5 w-5" />
                        <AlertTitle className="ml-2 font-bold">
                            Xác thực thất bại
                        </AlertTitle>
                        <AlertDescription className="mt-2 ml-2 text-sm leading-relaxed">
                            {errorMessage}
                        </AlertDescription>
                    </Alert>

                    <div className="mt-6 flex flex-col gap-3">
                        <Button
                            variant="default"
                            className="w-full"
                            onClick={() => router.push("/forgot-password")}
                        >
                            <RefreshCcw className="mr-2 h-4 w-4" />
                            Gửi lại yêu cầu mới
                        </Button>

                        <Button
                            variant="ghost"
                            className="text-muted-foreground w-full"
                            onClick={() => router.push("/login")}
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Quay lại đăng nhập
                        </Button>
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export default PasswordChecking;
