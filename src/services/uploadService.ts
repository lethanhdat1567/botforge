import api from "@/config/axios";

export const uploadService = {
    uploadFile: async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);

        return api.post("/upload/image", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },

    uploadMutipleFiles: async (files: File[]) => {
        await api.post("/upload/images", files);
    },
    deleteFile: async (path: string) => {
        await api.delete(`/upload/`, { params: { path } });
    },
};
