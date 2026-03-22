import { useAuthStore } from "@/store/authStore";

export class HttpError extends Error {
    status: number;
    payload: {
        status: string;
        data: {
            message: string;
            error?: string;
        };
    };

    constructor({ status, payload }: { status: number; payload: any }) {
        super(payload.data.message);
        this.status = status;
        this.payload = payload;
    }
}

export const getAuthToken = async () => {
    if (typeof window !== "undefined") {
        return useAuthStore.getState().accessToken;
    }

    try {
        const { cookies } = await import("next/headers");
        const cookieStore = await cookies();
        return cookieStore.get("accessToken")?.value;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const getRefreshToken = async () => {
    if (typeof window !== "undefined") {
        return localStorage.getItem("refreshToken");
    }

    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    return cookieStore.get("refreshToken")?.value;
};
