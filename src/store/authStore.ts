import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface User {
    id: string;
    email: string;
    role: string;
}

interface AuthState {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    accessTokenExpiresIn: number | null;

    // Actions
    setAuth: (payload: {
        user: User;
        accessToken: string;
        refreshToken: string;
        accessTokenExpiresIn: number;
    }) => void;

    clearAuth: () => void;
    updateAccessToken: (token: string) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            accessToken: null,
            refreshToken: null,
            accessTokenExpiresIn: null,

            setAuth: (payload) =>
                set({
                    user: payload.user,
                    accessToken: payload.accessToken,
                    refreshToken: payload.refreshToken,
                    accessTokenExpiresIn: payload.accessTokenExpiresIn,
                }),

            updateAccessToken: (token) => set({ accessToken: token }),

            clearAuth: () =>
                set({
                    user: null,
                    accessToken: null,
                    refreshToken: null,
                    accessTokenExpiresIn: null,
                }),
        }),
        {
            name: "auth-storage",
            storage: createJSONStorage(() => localStorage),
        },
    ),
);
