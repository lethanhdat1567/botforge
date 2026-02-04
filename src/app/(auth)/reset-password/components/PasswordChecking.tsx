import { Spinner } from "@/components/ui/spinner";
import { authService } from "@/services/authService";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function PasswordChecking({ setIsValidToken }: { setIsValidToken: any }) {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const [errorMessage, setErrorMessage] = useState("");
    const [checking, setChecking] = useState(false);

    useEffect(() => {
        const http = async () => {
            try {
                setChecking(true);
                await authService.checkResetToken(token || "");
                setIsValidToken(true);
            } catch (error: any) {
                const code = error?.response?.data?.data?.code;

                if (code === "INVALID_TOKEN") {
                    setErrorMessage("Liên kết đặt lại mật khẩu không hợp lệ.");
                } else if (code === "TOKEN_EXPIRED") {
                    setErrorMessage(
                        "Liên kết đặt lại mật khẩu đã hết hạn. Vui lòng yêu cầu liên kết mới.",
                    );
                } else {
                    toast.error("Đã có lỗi xảy ra. Vui lòng thử lại sau!");
                }
            } finally {
                setChecking(false);
            }
        };

        http();
    }, [token]);

    return (
        <div className="flex justify-center">
            {checking ? (
                <div className="text-muted-foreground flex items-center gap-2 text-sm">
                    <Spinner />
                    <span>Đang kiểm tra liên kết đặt lại mật khẩu...</span>
                </div>
            ) : errorMessage ? (
                <p className="text-center text-sm text-red-500">
                    {errorMessage}
                </p>
            ) : null}
        </div>
    );
}

export default PasswordChecking;
