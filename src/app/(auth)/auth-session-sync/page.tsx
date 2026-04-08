"use client";

import { authService } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

function AuthSessionSync() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const refreshToken = searchParams.get("refreshToken");
    const redirectTo = searchParams.get("redirectTo");
    const updateAccessTokenAndTokenExpiresIn = useAuthStore(
        (state) => state.updateAccessTokenAndTokenExpiresIn,
    );

    useEffect(() => {
        if (!refreshToken || !redirectTo) {
            router.push("/auth-logout");
        }

        const fetchRefreshToken = async () => {
            try {
                const res =
                    await authService.sliceSessionFromNextClientToNextServer({
                        refreshToken: refreshToken || "",
                    });

                updateAccessTokenAndTokenExpiresIn(
                    res.accessToken,
                    res.accessTokenExpiresIn,
                );

                router.push(redirectTo || "/login");
            } catch (error) {
                console.log(error);
                router.push("/auth-logout");
            }
        };

        fetchRefreshToken();
    }, [refreshToken]);

    return null;
}

export default function AuthSessionSyncPage() {
    return (
        <Suspense fallback={null}>
            <AuthSessionSync />
        </Suspense>
    );
}
