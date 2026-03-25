import { http } from "@/http/fetch";
import { baseResponse } from "@/types/response";

export type FlowShareCategory = {
    id: string;
    name: string;
    slug: string;
    description?: string;
    _count?: {
        flowShares: number;
    };
    createdAt: string;
    updatedAt: string;
};

export const flowShareCategoryService = {
    // GET /api/categories
    list: async () => {
        const response = await http.get<baseResponse<FlowShareCategory[]>>(
            "/api/flow-share-categories",
        );
        return response.data;
    },

    // GET /api/categories/:slug
    detail: async (slug: string) => {
        const response = await http.get<baseResponse<FlowShareCategory>>(
            `/categories/${slug}`,
        );
        return response.data;
    },

    // POST /api/categories
    create: async (data: {
        name: string;
        description?: string;
        slug?: string;
    }) => {
        const response = await http.post<baseResponse<FlowShareCategory>>(
            "/api/flow-share-categories",
            data,
        );
        return response.data;
    },

    // PATCH /api/categories/:id
    update: async (
        id: string,
        data: Partial<baseResponse<FlowShareCategory>>,
    ) => {
        const response = await http.patch<baseResponse<FlowShareCategory>>(
            `"/api/flow-share-categories/${id}`,
            data,
        );
        return response.data;
    },

    // DELETE /api/categories/:id
    remove: async (id: string) => {
        const response = await http.delete(`/api/flow-share-categories/${id}`);
        return response;
    },

    // POST /api/categories/bulk-delete
    bulkDelete: async (ids: string[]) => {
        const response = await http.post("/api/flow-share-categories", { ids });
        return response;
    },
};
