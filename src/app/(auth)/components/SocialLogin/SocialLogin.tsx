"use client";

import { googleIcon } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { useGoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { authService } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";

function SocialLogin() {
    const setAuth = useAuthStore((state) => state.setAuth);
    const [isLoading, setIsLoading] = useState(false);

    const loginWithGoogle = useGoogleLogin({
        flow: "auth-code",
        onSuccess: async (codeResponse) => {
            setIsLoading(true);
            try {
                const res = await authService.googleLogin(codeResponse.code);
                console.log(res);

                setAuth({
                    user: res.user,
                    accessToken: res.accessToken,
                    refreshToken: res.refreshToken,
                    accessTokenExpiresIn: res.accessTokenExpiresIn,
                });
                toast.success("Đăng nhập thành công!");
            } catch (error) {
                console.log(error);

                toast.error("Đăng nhập thất bại.");
            } finally {
                setIsLoading(false);
            }
        },
        onError: () => {
            toast.error("Kết nối Google thất bại");
            setIsLoading(false);
        },
    });

    return (
        <Field className="flex flex-col gap-3">
            <Button
                variant="outline"
                type="button"
                className="w-full gap-2 transition-all active:scale-95"
                onClick={() => loginWithGoogle()}
                disabled={isLoading}
            >
                {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                    googleIcon
                )}
                <span>
                    {isLoading ? "Đang xử lý..." : "Đăng nhập bằng Google"}
                </span>
            </Button>
        </Field>
    );
}

export default SocialLogin;
