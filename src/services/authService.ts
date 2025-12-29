import api from "@/config/axios";

export const authService = {
    // Client
    login: async (payload: { emailOrUsername: string; password: string }) => {
        const res = await api.post("/auth/login", payload);
        return res.data;
    },
    register: async (payload: {
        email: string;
        password: string;
        username: string;
        displayName: string;
    }) => {
        const res = await api.post("/auth/register", payload);
        return res.data;
    },
    forgotPassword: async (payload: { email: string }) => {
        const res = await api.post("/auth/forgot-password", payload);
        return res.data;
    },
    checkResetToken: async (token: string) => {
        const res = await api.get("/auth/check-reset-token", {
            params: { token },
        });
        return res.data;
    },

    resetPassword: async (payload: { token: string; newPassword: string }) => {
        const res = await api.post(
            "/auth/reset-password",
            { newPassword: payload.newPassword },
            { params: { token: payload.token } },
        );
        return res.data;
    },
    logout: async (accessToken: string) => {
        const res = await api.post("/auth/logout", { accessToken });
        return res.data;
    },
    logoutFromClientToServer: async (accessToken: string) => {
        const res = await api.post("/api/auth/logout", { accessToken }, {
            isFetchClientToServerNext: true,
        } as any);
        return res.data;
    },
    me: async () => {
        const res = await api.get("/auth/me");
        return res.data;
    },

    // Server
    setTokenFromClientToServer: async (data: {
        accessToken: string;
        expiredIn: number;
        role: "admin" | "user";
    }) => {
        const res = await api.post("/api/auth", data, {
            isFetchClientToServerNext: true,
        } as any);

        return res.data;
    },

    refreshTokenFromClientToServer: async (refreshToken: string) => {
        const res = await api.post(
            "/api/auth/slice-session",
            { refreshToken },
            {
                isFetchClientToServerNext: true,
            } as any,
        );
        return res.data;
    },

    refreshToken: async (refreshToken: string) => {
        const res = await api.post("/auth/refresh-token", {
            refresh_token: refreshToken,
        });
        return res.data;
    },
};
