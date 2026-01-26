import api from "@/config/axios";
import type { SharedUser } from "@/services/flowSharedService";

export type FlowSharedSaveUser = SharedUser & {
    createdAt: string;
};

export const flowSharedSaveService = {
    // GET /flows/save/me
    getMySaved: async () => {
        const response = await api.get("/flows/save/me");
        return response.data;
        // { message, data: FlowShare[] }
    },

    // POST /flows/save/:flowShareId/toggle
    toggleSave: async (flowShareId: string) => {
        const response = await api.post(`/flows/save/${flowShareId}/toggle`);
        return response.data;
        // { message, data: { saveCount, saved } }
    },

    // GET /flows/save/:flowShareId/status
    getSaveStatus: async (flowShareId: string) => {
        const response = await api.get(`/flows/save/${flowShareId}/status`);
        return response.data;
        // { message, data: { saved } }
    },

    // GET /flows/save/:flowShareId/users
    getSavedUsers: async (flowShareId: string) => {
        const response = await api.get<FlowSharedSaveUser[]>(
            `/flows/save/${flowShareId}/users`,
        );
        return response.data;
    },
};
