import api from "@/config/axios";

export type FlowSharedLikeUser = {
    id: string;
    username: string;
    displayName: string;
    avatar: string;
    email: string;
    createdAt: string;
};

export const flowSharedLikeService = {
    // POST /flows/like/:flowShareId/toggle
    toggleLike: async (flowShareId: string) => {
        const response = await api.post(`/flows/like/${flowShareId}/toggle`);
        return response.data;
        // { message, data: { likeCount, liked } }
    },

    // GET /flows/like/:flowShareId/count
    getLikeCount: async (flowShareId: string) => {
        const response = await api.get(`/flows/like/${flowShareId}/count`);
        return response.data;
        // { data: { likeCount } }
    },

    // GET /flows/like/:flowShareId/status
    getLikeStatus: async (flowShareId: string) => {
        const response = await api.get(`/flows/like/${flowShareId}/status`);
        return response.data;
    },

    // GET /flows/like/:flowShareId/users
    getLikedUsers: async (flowShareId: string) => {
        const response = await api.get<FlowSharedLikeUser[]>(
            `/flows/like/${flowShareId}/users`,
        );
        return response.data;
    },
};
