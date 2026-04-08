import { http } from "@/http/fetch";
import { baseResponse } from "@/types/response";

export type GuideStatus = "draft" | "published" | "archived";

export interface Guide {
    id: string;
    slug: string;
    title: string;
    summary: string;
    content: string;
    thumbnail?: string;
    status: GuideStatus;
    createdAt: string;
    updatedAt: string;
}

export const guideService = {
    list: async () => {
        return http.get<baseResponse<{ items: Guide[] }>>("/api/guides");
    },

    publicDetail: async (slug: string) => {
        return http.get<baseResponse<Guide>>(`/api/guides/slug/${slug}`);
    },

    remove: async (idOrIds: string | string[]) => {
        if (Array.isArray(idOrIds)) {
            return http.post<baseResponse<unknown>>("/api/guides/delete-many", {
                ids: idOrIds,
            });
        }
        return http.delete<baseResponse<unknown>>(`/api/guides/${idOrIds}`);
    },
};
