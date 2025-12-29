"use client";

import { authService } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function Logout() {
    const logout = useAuthStore((state) => state.logout);
    const accessToken = localStorage.getItem("accessToken");
    const router = useRouter();

    useEffect(() => {
        const http = async () => {
            try {
                await authService.logoutFromClientToServer(accessToken || "");
            } catch (error) {
                console.log(error);
            } finally {
                router.push(`/login` as any);
                logout();
            }
        };

        http();
    }, [accessToken]);

    return null;
}

export default Logout;
