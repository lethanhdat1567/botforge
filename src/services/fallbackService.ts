import api from "@/config/axios";

export type TimeoutUnit = "second" | "minute" | "hour" | "day";

export interface FallbackPayload {
    timeoutDuration: number;
    timeoutUnit: TimeoutUnit;
    fallbackMessage: string;
}

export const fallbackService = {
    getFallback: async () => {
        const response = await api.get("/fallback");

        return response.data.data;
    },

    createFallback: async (payload: FallbackPayload) => {
        const response = await api.post("/fallback", payload);
        return response.data.data;
    },

    updateFallback: async (payload: FallbackPayload) => {
        const response = await api.post("/fallback", payload);
        return response.data.data;
    },
};
