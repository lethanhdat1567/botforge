"use client";

import { authService } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function AuthLogout() {
    const router = useRouter();
    const clearAuth = useAuthStore((state) => state.clearAuth);

    useEffect(() => {
        (async () => {
            try {
                await authService.logoutFromNextClientToNextServer();
            } catch (error) {
                console.log(error);
            } finally {
                clearAuth();
                router.push("/login");
            }
        })();
    }, []);

    return null;
}

export default AuthLogout;
