import { http } from "@/http/fetch";
import { baseResponse } from "@/types/response";

interface File {
    type: string;
    filename: string;
    path: string;
}

export const uploadService = {
    uploadFile: async (file: any): Promise<File> => {
        const formData = new FormData();
        formData.append("file", file);

        const res: baseResponse<File> = await http.post(
            "/api/upload/file",
            formData,
        );

        return res.data;
    },

    uploadMutipleFiles: async (files: File[]) => {
        await http.post("/api/upload/files", files);
    },
    deleteFile: async (path: string) => {
        await http.delete(`/api/upload`, { params: { path } });
    },
};
