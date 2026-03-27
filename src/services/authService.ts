import envConfig from "@/config/envConfig";
import { http } from "@/http/fetch";
import { baseResponse } from "@/types/response";

const AUTH_BASE_URL = "/api/auth";

export interface User {
    id: string;
    email: string;
    role: string;
    avatar: string;
}

type DataResponse = {
    user: User;
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresIn: number;
};

type authResponse = baseResponse<DataResponse>;

interface ServerPayload {
    accessToken: string;
    role: string;
    accessTokenExpiresIn: number;
    refreshToken: string;
}

interface RefreshResponse {
    accessToken: string;
    accessTokenExpiresIn: number;
}

export const authService = {
    me: async () => {
        const res: baseResponse<User> = await http.get(`${AUTH_BASE_URL}/me`);

        return res.data;
    },

    login: async (payload: {
        email: string;
        password: string;
    }): Promise<DataResponse> => {
        const res: authResponse = await http.post(
            `${AUTH_BASE_URL}/login`,
            payload,
        );
        return res.data;
    },

    googleLogin: async (code: string): Promise<DataResponse> => {
        const res: authResponse = await http.post(`${AUTH_BASE_URL}/google`, {
            code,
        });

        return res.data;
    },
    register: async (payload: {
        email: string;
        password: string;
        displayName: string;
    }) => {
        const res = await http.post(`${AUTH_BASE_URL}/register`, payload);
        return res;
    },

    verifyEmail: async (payload: { token: string }): Promise<DataResponse> => {
        const res: authResponse = await http.post(
            `${AUTH_BASE_URL}/verify-email`,
            payload,
        );
        return res.data;
    },

    sendTokenForgotPassword: async (payload: { email: string }) => {
        const res = await http.post(
            `${AUTH_BASE_URL}/forgot-password`,
            payload,
        );
        return res;
    },

    refreshToken: async (payload: {
        refreshToken: string;
    }): Promise<RefreshResponse> => {
        const res: baseResponse<RefreshResponse> = await http.post(
            `${AUTH_BASE_URL}/refresh-token`,
            payload,
        );
        return res.data;
    },
    resetPassword: async (payload: {
        userId: string;
        newPassword: string;
        token: string;
    }) => {
        const res = await http.post(
            `${AUTH_BASE_URL}/reset-password`,
            payload,
            {
                params: {
                    token: payload.token,
                },
            },
        );

        return res;
    },

    verifyResetPassword: async (payload: {
        token: string;
    }): Promise<{ userId: string }> => {
        const res: baseResponse<{ userId: string }> = await http.post(
            `${AUTH_BASE_URL}/verify-reset-password`,
            payload,
        );
        return res.data;
    },

    logout: async (refreshToken: string) => {
        const res = await http.post(`${AUTH_BASE_URL}/logout`, {
            refreshToken,
        });
        return res;
    },

    loginFromNextClientToNextServer: async (payload: ServerPayload) => {
        const res = await http.post(`${AUTH_BASE_URL}`, payload, {
            baseUrl: envConfig.BASE_URL,
        });
        return res;
    },

    logoutFromNextClientToNextServer: async () => {
        const res = await http.post(
            `${AUTH_BASE_URL}/logout`,
            {},
            {
                baseUrl: envConfig.BASE_URL,
            },
        );

        return res;
    },

    sliceSessionFromNextClientToNextServer: async (payload: {
        refreshToken: string;
    }): Promise<{ accessToken: string; accessTokenExpiresIn: number }> => {
        const res: baseResponse<{
            accessToken: string;
            accessTokenExpiresIn: number;
        }> = await http.post(`${AUTH_BASE_URL}/slice-session`, payload, {
            baseUrl: envConfig.BASE_URL,
        });

        return res.data;
    },
};
