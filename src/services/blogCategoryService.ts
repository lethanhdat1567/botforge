import { http } from "@/http/fetch";
import { baseResponse } from "@/types/response";

export interface PostCategory {
    id: string;
    name: string;
    slug: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface CreateCategoryPayload {
    name: string;
    slug: string;
}

export interface PostCategoryQuery {
    q?: string;
}

export const postCategoryService = {
    list: async (query?: PostCategoryQuery) => {
        const response: baseResponse<{ postCategories: PostCategory[] }> =
            await http.get("/api/post-categories", {
                params: { q: query?.q },
            });
        return response.data;
    },

    detail: async (id: string) => {
        const response: baseResponse<PostCategory> = await http.get(
            `/api/post-categories/${id}`,
        );
        return response.data;
    },

    create: async (payload: CreateCategoryPayload) => {
        const response: baseResponse<{ postCategories: PostCategory[] }> =
            await http.post("/api/post-categories", payload);
        return response.data;
    },

    update: async (id: string, payload: Partial<CreateCategoryPayload>) => {
        const response: baseResponse<{ postCategories: PostCategory[] }> =
            await http.patch(`/api/post-categories/${id}`, payload);
        return response.data;
    },

    delete: async (id: string) => {
        const response: baseResponse<{ postCategories: PostCategory[] }> =
            await http.delete(`/api/post-categories/${id}`);
        return response.data;
    },

    bulkDelete: async (ids: string[]) => {
        const response: baseResponse<{ postCategories: PostCategory[] }> =
            await http.post("/api/post-categories/delete-many", {
                ids,
            });
        return response.data;
    },
};
