import { http } from "@/http/fetch";

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
        const res = await http.get("/api/users", {
            params: params
                ? {
                      page: params.page,
                      limit: params.limit,
                      q: params.q,
                  }
                : undefined,
        });

        return res;
    },

    /**
     * Chi tiết user
     * GET /users/:id
     */
    detail: async (id: string) => {
        const res = await http.get(`/api/users/${id}`);
        return res;
    },

    /**
     * Cập nhật user
     * PATCH /users/:id
     */
    update: async (id: string, payload: AdminUserUpdatePayload) => {
        const res = await http.patch(`/api/users/${id}`, payload);
        return res;
    },

    /**
     * Xóa user
     * DELETE /users/:id
     */
    remove: async (id: string) => {
        const res = await http.delete(`/api/users/${id}`);
        return res;
    },
};
