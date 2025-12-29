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
                if (error.response.data.data.code === "INVALID_TOKEN") {
                    setErrorMessage("Token không hợp lệ");
                } else if (error.response.data.data.code === "TOKEN_EXPIRED") {
                    setErrorMessage("Token đã hết hạn");
                } else {
                    toast.error("Đã có lỗi xảy ra, vui lòng thử lại");
                }
            } finally {
                setChecking(false);
            }
        };

        http();
    }, [token]);

    return (
        <div>
            {checking ? (
                <div className="flex items-center justify-center gap-2 text-sm">
                    <Spinner /> Đang kiểm tra token...
                </div>
            ) : (
                <div>{errorMessage || ""}</div>
            )}
        </div>
    );
}

export default PasswordChecking;
