"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { authService } from "@/services/authService";

export default function SliceSession() {
    const setToken = useAuthStore((state) => state.setToken);
    const router = useRouter();
    const logout = useAuthStore((state) => state.logout);

    useEffect(() => {
        const interval = setInterval(async () => {
            const refreshToken = localStorage.getItem("refreshToken");
            try {
                const res = await authService.refreshTokenFromClientToServer(
                    refreshToken || "",
                );

                setToken(res.access_token, res.refresh_token, res.expired_in);
            } catch (error: any) {
                const code = error.response?.data?.code;
                if (code === "TOKEN_EXPIRED" || code === "INVALID_TOKEN") {
                    console.log("Token expired");
                } else {
                    console.log(
                        "Refresh failed:",
                        error.response?.data || error,
                    );
                }
                logout();
                router.push(`/login?token=${refreshToken}` as any);
            }
        }, 15000);

        return () => clearInterval(interval);
    }, [router]);

    return null;
}
