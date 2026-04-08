import { http } from "@/http/fetch";
import { baseResponse } from "@/types/response";

export type TimeoutUnit = "second" | "minute" | "hour" | "day";

export interface FallbackPayload {
    timeoutDuration: number;
    timeoutUnit: TimeoutUnit;
    fallbackMessage: string;
}

export const fallbackService = {
    getFallback: async () => {
        const response = await http.get<baseResponse<any>>("/api/fallback");

        return response.data;
    },

    createFallback: async (payload: FallbackPayload) => {
        const response = await http.post<baseResponse<any>>(
            "/api/fallback",
            payload,
        );
        return response.data;
    },

    updateFallback: async (payload: FallbackPayload) => {
        const response = await http.post<baseResponse<any>>(
            "/api/fallback",
            payload,
        );
        return response.data;
    },
};
