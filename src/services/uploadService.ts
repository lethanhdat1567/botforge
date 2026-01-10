import api from "@/config/axios";

export const uploadService = {
    uploadFile: async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);

        const res = await api.post("/upload/file", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return res.data;
    },

    uploadMutipleFiles: async (files: File[]) => {
        await api.post("/upload/files", files);
    },
    deleteFile: async (path: string) => {
        await api.delete(`/upload`, { params: { path } });
    },
};
