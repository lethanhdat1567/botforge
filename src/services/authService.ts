import api from "@/config/axios";
import { check } from "zod";

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
    logout: async () => {
        const res = await api.post("/auth/logout");
        return res.data;
    },
    me: async () => {
        const res = await api.get("/auth/me");
        return res.data;
    },

    // Server
};
