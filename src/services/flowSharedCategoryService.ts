import { http } from "@/http/fetch";
import { baseResponse } from "@/types/response";

export type FlowShareCategory = {
    id: string;
    name: string;
    slug: string;
    _count?: {
        flowShares: number;
    };
    createdAt?: string;
    updatedAt?: string;
};

export type FlowShareCategoryPayload = {
    name: string;
    slug?: string;
};

export const flowShareCategoryService = {
    list: async () => {
        const response = await http.get<baseResponse<FlowShareCategory[]>>(
            "/api/flow-share-categories",
        );
        return response.data;
    },

    detail: async (slug: string) => {
        const response = await http.get<baseResponse<FlowShareCategory>>(
            `/api/flow-share-categories/${encodeURIComponent(slug)}`,
        );
        return response.data;
    },

    create: async (data: FlowShareCategoryPayload) => {
        const response = await http.post<baseResponse<FlowShareCategory>>(
            "/api/flow-share-categories",
            data,
        );
        return response.data;
    },

    update: async (id: string, data: Partial<FlowShareCategoryPayload>) => {
        const response = await http.patch<baseResponse<FlowShareCategory>>(
            `/api/flow-share-categories/${id}`,
            data,
        );
        return response.data;
    },

    remove: async (id: string) => {
        const response = await http.delete<baseResponse<null>>(
            `/api/flow-share-categories/${id}`,
        );
        return response.data;
    },

    bulkDelete: async (ids: string[]) => {
        const response = await http.post<baseResponse<{ count: number }>>(
            "/api/flow-share-categories/bulk-delete",
            { ids },
        );
        return response.data;
    },
};
