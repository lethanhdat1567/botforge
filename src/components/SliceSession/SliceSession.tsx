"use client";

import { authService } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";

function SliceSession() {
    const refreshToken = useAuthStore((state) => state.refreshToken);
    const updateAccessTokenAndTokenExpiresIn = useAuthStore(
        (state) => state.updateAccessTokenAndTokenExpiresIn,
    );

    useEffect(() => {
        if (!refreshToken) return;

        const intervalId = setInterval(
            async () => {
                try {
                    const res =
                        await authService.sliceSessionFromNextClientToNextServer(
                            {
                                refreshToken: refreshToken || "",
                            },
                        );

                    updateAccessTokenAndTokenExpiresIn(
                        res.accessToken,
                        res.accessTokenExpiresIn,
                    );
                } catch (error) {
                    console.log(error);
                }
            },
            15 * 60 * 1000,
        );

        return () => clearInterval(intervalId);
    }, [refreshToken]);

    return null;
}

export default SliceSession;
