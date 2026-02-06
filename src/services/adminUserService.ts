import api from "@/config/axios";

/* ================== TYPES ================== */

export type AdminUserListParams = {
    page?: number;
    limit?: number;
    q?: string;
};

export type AdminUserUpdatePayload = {
    displayName?: string;
    role?: string;
};

/* ================== SERVICE ================== */

export const adminUserService = {
    /**
     * Danh sách user (admin)
     * GET /users
     */
    list: async (params?: AdminUserListParams) => {
        const res = await api.get("/users", {
            params: params
                ? {
                      page: params.page,
                      limit: params.limit,
                      q: params.q,
                  }
                : undefined,
        });

        return res.data;
    },

    /**
     * Chi tiết user
     * GET /users/:id
     */
    detail: async (id: string) => {
        const res = await api.get(`/users/${id}`);
        return res.data;
    },

    /**
     * Cập nhật user
     * PATCH /users/:id
     */
    update: async (id: string, payload: AdminUserUpdatePayload) => {
        const res = await api.patch(`/users/${id}`, payload);
        return res.data;
    },

    /**
     * Xóa user
     * DELETE /users/:id
     */
    remove: async (id: string) => {
        const res = await api.delete(`/users/${id}`);
        return res.data;
    },
};
