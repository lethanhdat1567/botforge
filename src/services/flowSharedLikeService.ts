import { http } from "@/http/fetch";
import { baseResponse } from "@/types/response";

export type FlowSharedLikeUser = {
    id: string;
    username: string;
    displayName: string;
    avatar: string;
    email: string;
    createdAt: string;
};

export const flowSharedLikeService = {
    // POST /api/flow-share-likes/:flowShareId/toggle
    toggleLike: async (flowShareId: string) => {
        const response = await http.post<baseResponse<any>>(
            `/api/flow-share-likes/${flowShareId}`,
            null,
        );
        return response.data;
    },

    // GET /api/flow-share-likes/:flowShareId/count
    getLikeCount: async (flowShareId: string) => {
        const response = await http.get<baseResponse<any>>(
            `/api/flow-share-likes/${flowShareId}/count`,
        );
        return response.data;
    },

    // GET /api/flow-share-likes/:flowShareId/status
    getLikeStatus: async (flowShareId: string) => {
        const response = await http.get<baseResponse<any>>(
            `/api/flow-share-likes/${flowShareId}/status`,
        );
        return response.data;
    },

    // GET /api/flow-share-likes/:flowShareId/users
    getLikedUsers: async (flowShareId: string) => {
        const response = await http.get<
            baseResponse<{ users: FlowSharedLikeUser[] }>
        >(`/api/flow-share-likes/${flowShareId}`);
        return response.data;
    },
};
