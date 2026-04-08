"use client";

import { authService } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function Logout() {
    const clearAuth = useAuthStore((state) => state.clearAuth);
    const router = useRouter();

    useEffect(() => {
        const http = async () => {
            try {
                await authService.logoutFromNextClientToNextServer();
            } catch (error) {
                console.log(error);
            } finally {
                router.push(`/login` as any);
                clearAuth();
            }
        };

        void http();
    }, [clearAuth, router]);

    return null;
}

export default Logout;
