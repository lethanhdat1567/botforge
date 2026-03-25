import { http } from "@/http/fetch";
import { baseResponse } from "@/types/response";

export const flowSharedSaveService = {
    // GET /flows/save/me
    getMySaved: async () => {
        const response = await http.get<baseResponse<any>>(
            "/api/flow-share-saves/me",
        );
        return response.data;
    },

    // POST /flows/save/:flowShareId/toggle
    toggleSave: async (flowShareId: string) => {
        const response = await http.post<baseResponse<any>>(
            `/api/flow-share-saves/${flowShareId}`,
            null,
        );
        return response.data;
    },

    getSaveStatus: async (flowShareId: string) => {
        const response = await http.get<baseResponse<any>>(
            `/api/flow-share-saves/${flowShareId}/status`,
        );
        return response.data;
    },
};
