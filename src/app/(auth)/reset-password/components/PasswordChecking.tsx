import { authService } from "@/services/authService";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

function PasswordChecking() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    useEffect(() => {
        const http = async () => {
            try {
                const res = await authService.checkResetToken(token || "");
                console.log(res);
            } catch (error: any) {
                if (error.response.data.data.code === "INVALID_TOKEN") {
                } else if (error.response.data.data.code === "TOKEN_EXPIRED") {
                }
            }
        };

        http();
    }, [token]);

    return <div>Checking...</div>;
}

export default PasswordChecking;
