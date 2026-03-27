import { http } from "@/http/fetch";
import { PaginationMeta } from "@/types/data-table";
import { baseResponse } from "@/types/response";

export interface User {
    id: string;
    email: string;
    username: string;
    displayName: string;
    role: "admin" | "user";
    avatar?: string;
    createdAt: string;
}

export interface AdminUserListResponse {
    users: User[];
    meta: PaginationMeta;
}

export const profileService = {
    getProfile: async () => {
        const response = await http.get<baseResponse<any>>("/api/auth/me");
        return response.data;
    },

    getAdminUsers: async (params: {
        q?: string;
        page?: number;
        limit?: number;
    }) => {
        const response = await http.get<baseResponse<AdminUserListResponse>>(
            "/api/users/admin/list",
            {
                params,
            },
        );
        return response.data;
    },

    updateProfile: async (
        userId: string,
        data: {
            displayName?: string;
            username?: string;
            email?: string;
            avatar?: string;
        },
    ) => {
        const response = await http.patch(`/api/users/update/${userId}`, data);
        return response;
    },

    changePassword: async (
        userId: string,
        data: {
            oldPassword: string;
            newPassword: string;
        },
    ) => {
        const response = await http.patch(
            `/api/users/update-password/${userId}`,
            data,
        );
        return response;
    },

    deleteUser: async (id: string) => {
        const response = await http.delete(`/api/users/delete/${id}`);
        return response;
    },

    deleteBulkUsers: async (ids: string[]) => {
        const response = await http.post(`/api/users/delete-bulk`, { ids });
        return response;
    },
};
