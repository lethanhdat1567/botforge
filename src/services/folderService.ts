import api from "@/config/axios";

export const folderService = {
    getFolders: async (q?: string) => {
        const response = await api.get("/folders/me", { params: { q } });
        return response.data;
    },

    getFlows: async (id: string) => {
        const response = await api.get(`/folders/${id}/flows`);
        return response.data;
    },
    createFolder: async (name: string, platform: string) => {
        const response = await api.post("/folders", { name, platform });
        return response.data;
    },

    destroyFolder: async (id: string) => {
        const response = await api.delete(`/folders/${id}`);
        return response.data;
    },

    updateFolder: async (id: string, name: string) => {
        const response = await api.patch(`/folders/${id}`, { name });
        return response.data;
    },

    duplicateFolder: async (id: string) => {
        const response = await api.post(`/folders/${id}/duplicate`);
        return response.data;
    },
};
