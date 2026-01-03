import api from "@/config/axios";

export const uploadService = {
    uploadFile: async (file: File) => {
        await api.post("/api/upload/image", file);
    },
    uploadMutipleFiles: async (files: File[]) => {
        await api.post("/api/upload/images", files);
    },
    deleteFile: async (path: string) => {
        await api.delete(`/api/upload/${path}`);
    },
};
