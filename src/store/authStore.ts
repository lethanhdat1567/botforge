"use client";

import { create } from "zustand";

export interface IUser {
    id: string;
    username: string;
    displayName?: string | null;
    email: string;
    avatar?: string | null;
    role: string; // hoặc Role
    provider: string; // hoặc Provider
    providerId?: string | null;
    createdAt: Date;
    updatedAt: Date;
}

interface AuthState {
    user: IUser | null;
    accessToken: string | null;
    refreshToken: string | null;
    expiredIn: number | null;
    setUser: (
        user: IUser,
        accessToken: string,
        refreshToken: string,
        expiredIn: number,
    ) => void;
    setToken: (token: string, refreshToken: string, expiredIn: number) => void;
    logout: () => void;
}

const isClient = typeof window !== "undefined";

export const useAuthStore = create<AuthState>((set) => ({
    user: isClient ? JSON.parse(localStorage.getItem("user") || "null") : null,

    accessToken: isClient ? localStorage.getItem("accessToken") : null,

    refreshToken: isClient ? localStorage.getItem("refreshToken") : null,

    expiredIn: isClient ? Number(localStorage.getItem("expiredIn")) : null,

    setUser: (user, accessToken, refreshToken, expiredIn) => {
        if (typeof window !== "undefined") {
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            localStorage.setItem("expiredIn", expiredIn?.toString());
        }
        set({ user, accessToken, refreshToken, expiredIn });
    },

    setToken: (token: string, refreshToken: string, expiredIn: number) => {
        if (typeof window !== "undefined") {
            localStorage.setItem("accessToken", token);
            localStorage.setItem("refreshToken", refreshToken);
            localStorage.setItem("expiredIn", expiredIn?.toString());
        }
    },

    logout: () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem("user");
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("expiredIn");
        }
        set({
            user: null,
            accessToken: null,
            refreshToken: null,
            expiredIn: null,
        });
    },
}));
