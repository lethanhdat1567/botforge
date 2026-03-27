import { http } from "@/http/fetch";
import { baseResponse } from "@/types/response";

// 1. Interfaces & Types
export type PostStatus = "active" | "inactive";

export interface Post {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    content?: string;
    status: PostStatus;
    createdAt: string;
    slug: string;
    updatedAt: string;
    author: {
        id: string;
        displayName: string;
        username: string;
        avatar: string;
    };
    category: {
        id: string;
        name: string;
        slug: string;
    };
}

export interface CreatePostPayload {
    categoryId: string;
    title: string;
    description: string;
    thumbnail: string;
    slug: string;
    content: string;
    status: PostStatus;
}

export interface PostQuery {
    q?: string;
    status?: PostStatus;
    page?: number;
    limit?: number;
    [key: string]: any;
}

export const blogService = {
    listAdmin: async (query?: PostQuery) => {
        const response: baseResponse<{ posts: Post[]; meta: any }> =
            await http.get("/api/posts/admin", { params: query });
        return response.data;
    },

    listPublic: async (query?: PostQuery) => {
        const response: baseResponse<{ posts: Post[]; meta: any }> =
            await http.get("/api/posts/public", { params: query });
        return response.data;
    },

    listByCategory: async (categorySlug: string, query?: PostQuery) => {
        const response: baseResponse<{ posts: Post[]; meta: any }> =
            await http.get(`/api/posts/category/${categorySlug}`, {
                params: query,
            });
        return response.data;
    },

    detail: async (id: string) => {
        const response: baseResponse<Post> = await http.get(`/api/posts/${id}`);
        return response.data;
    },

    detailBySlug: async (slug: string) => {
        const response: baseResponse<Post> = await http.get(
            `/api/posts/slug/${slug}`,
        );
        return response.data;
    },

    create: async (payload: CreatePostPayload) => {
        const response: baseResponse<Post> = await http.post(
            "/api/posts",
            payload,
        );
        return response.data;
    },

    update: async (id: string, payload: Partial<CreatePostPayload>) => {
        const response: baseResponse<Post> = await http.patch(
            `/api/posts/${id}`,
            payload,
        );
        return response.data;
    },

    delete: async (id: string) => {
        const response: baseResponse<any> = await http.delete(
            `/api/posts/${id}`,
        );
        return response.data;
    },

    bulkDelete: async (ids: string[]) => {
        const response: baseResponse<any> = await http.post(
            "/api/posts/delete-many",
            {
                ids,
            },
        );
        return response.data;
    },
};
