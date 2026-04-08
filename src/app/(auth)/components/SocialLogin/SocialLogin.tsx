"use client";

import { googleIcon } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { authService } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { getClientAuth } from "@/config/firebaseClient";

function SocialLogin() {
    const router = useRouter();
    const setAuth = useAuthStore((state) => state.setAuth);
    const [isLoading, setIsLoading] = useState(false);

    const loginWithGoogle = async () => {
        setIsLoading(true);
        try {
            const auth = getClientAuth();
            const provider = new GoogleAuthProvider();
            const credential = await signInWithPopup(auth, provider);
            const idToken = await credential.user.getIdToken();
            const res = await authService.googleLogin(idToken);
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
            toast.success("Đăng nhập thành công!");
            router.push("/dashboard");
        } catch (error) {
            console.error(error);
            if (error instanceof Error && error.message.includes("Thiếu biến môi trường")) {
                toast.error(error.message);
            } else {
                toast.error("Đăng nhập thất bại.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Field className="flex flex-col gap-3">
            <Button
                variant="outline"
                type="button"
                className="w-full gap-2 transition-all active:scale-95"
                onClick={() => void loginWithGoogle()}
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
