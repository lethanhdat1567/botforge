import api from "@/config/axios";

export const flowService = {
    createFlow: async (data: {
        name: string;
        folderId: string;
        platform: string;
    }) => {
        const response = await api.post("/flows", data);
        return response.data;
    },

    duplicateFlow: async (id: string) => {
        const response = await api.post(`/flows/${id}/duplicate`);
        return response.data;
    },

    updateFlow: async (id: string, data: any) => {
        const response = await api.patch(`/flows/${id}`, data);
        return response.data;
    },

    destroyFlow: async (id: string) => {
        const response = await api.delete(`/flows/${id}`);
        return response.data;
    },
};
