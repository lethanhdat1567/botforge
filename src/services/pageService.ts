import api from "@/config/axios";

export const pageService = {
    // =====================
    // Client
    // =====================

    // Tạo page mới
    create: async (payload: {
        name: string;
        platform: "facebook" | "instagram" | "zalo";
        pageId: string;
        accessToken: string;
        avatar?: string;
    }) => {
        const res = await api.post("/pages", payload);
        return res.data;
    },

    // Lấy danh sách page của user
    list: async () => {
        const res = await api.get("/pages");
        return res.data;
    },

    // Lấy chi tiết page
    detail: async (id: string) => {
        const res = await api.get(`/pages/${id}`);
        return res.data;
    },

    // Cập nhật page
    update: async (
        id: string,
        payload: {
            name?: string;
            accessToken?: string;
            avatar?: string;
            status?: "active" | "inactive";
        },
    ) => {
        const res = await api.patch(`/pages/${id}`, payload);
        return res.data;
    },

    // Xoá page
    remove: async (id: string) => {
        const res = await api.delete(`/pages/${id}`);
        return res.data;
    },

    // =====================
    // Server (Next.js)
    // =====================

    // Tạo page từ server (nếu cần)
    createFromClientToServer: async (payload: {
        name: string;
        platform: string;
        pageId: string;
        accessToken: string;
        avatar?: string;
    }) => {
        const res = await api.post("/api/pages", payload, {
            isFetchClientToServerNext: true,
        } as any);

        return res.data;
    },

    // List page từ server
    listFromClientToServer: async () => {
        const res = await api.get("/api/pages", {
            isFetchClientToServerNext: true,
        } as any);

        return res.data;
    },
};
