import { http } from "@/http/fetch";

export const folderService = {
    getFolders: async (q?: string) => {
        const response = await http.get("/api/folders/me", { params: { q } });
        return response;
    },

    getFlows: async (id: string) => {
        const response = await http.get(`/api/folders/${id}/flows`);
        return response;
    },
    createFolder: async (name: string, platform: string) => {
        const response = await http.post("/api/folders", { name, platform });
        return response;
    },

    destroyFolder: async (id: string) => {
        const response = await http.delete(`/api/folders/${id}`);
        return response;
    },

    updateFolder: async (id: string, name: string) => {
        const response = await http.patch(`/api/folders/${id}`, { name });
        return response;
    },

    duplicateFolder: async (id: string) => {
        const response = await http.post(`/api/folders/${id}/duplicate`, {});
        return response;
    },
};
