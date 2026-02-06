import api from "@/config/axios";
import { AdminGuideListParams, GuidePayload } from "./types";

/* ================== TYPES ================== */

export type GuideStatus = "draft" | "published" | "archived";

export type AdminGuideListParams = {
    page?: number;
    limit?: number;
    q?: string;
    status?: GuideStatus;
};

export type GuidePayload = {
    slug: string;
    title: string;
    summary?: string;
    content: string;
    status?: GuideStatus;
    thumbnail?: File | null;
};

/* ================== SERVICE ================== */

export const guideService = {
    /**
     * Danh sách guide (admin)
     * GET /guides
     */
    list: async (params?: AdminGuideListParams) => {
        const res = await api.get("/guides", {
            params: params
                ? {
                      page: params.page,
                      limit: params.limit,
                      q: params.q,
                      status: params.status,
                  }
                : undefined,
        });

        return res.data;
    },

    /**
     * Chi tiết guide (admin)
     * GET /guides/detail/:id
     */
    detail: async (id: string) => {
        const res = await api.get(`/guides/detail/${id}`);
        return res.data;
    },

    /**
     * Chi tiết guide (public)
     * GET /guides/:slug
     */
    publicDetail: async (slug: string) => {
        const res = await api.get(`/guides/${slug}`);
        return res.data;
    },

    /**
     * Tạo guide
     * POST /guides
     */
    create: async (payload: GuidePayload) => {
        const formData = new FormData();

        formData.append("slug", payload.slug);
        formData.append("title", payload.title);
        formData.append("content", payload.content);

        if (payload.summary) {
            formData.append("summary", payload.summary);
        }

        if (payload.status) {
            formData.append("status", payload.status);
        }

        if (payload.thumbnail) {
            formData.append("thumbnail", payload.thumbnail);
        }

        const res = await api.post("/guides", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return res.data;
    },

    /**
     * Cập nhật guide
     * PUT /guides/:id
     */
    update: async (id: string, payload: Partial<GuidePayload>) => {
        const formData = new FormData();

        if (payload.slug) formData.append("slug", payload.slug);
        if (payload.title) formData.append("title", payload.title);
        if (payload.summary) formData.append("summary", payload.summary);
        if (payload.content) formData.append("content", payload.content);
        if (payload.status) formData.append("status", payload.status);

        if (payload.thumbnail) {
            formData.append("thumbnail", payload.thumbnail);
        }

        const res = await api.put(`/guides/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return res.data;
    },

    /**
     * Xóa guide
     * DELETE /guides/:id
     */
    remove: async (id: string) => {
        const res = await api.delete(`/guides/${id}`);
        return res.data;
    },
};
