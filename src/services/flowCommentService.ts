import api from "@/config/axios";

/* =======================
 * Types
 ======================= */

export type CommentUser = {
    id: string;
    username: string;
    displayName?: string;
    avatar?: string;
    email?: string;
};

export type FlowComment = {
    id: string;
    flowShareId: string;
    userId: string;
    comment: string;
    parentId?: string | null;
    createdAt: string;
    updatedAt: string;

    user?: CommentUser;
    replies?: FlowComment[];
};

/* =======================
 * Service
 ======================= */

export const flowCommentService = {
    // POST /flows/comment
    createComment: async (data: {
        flowShareId: string;
        comment: string;
        parentId?: string;
    }) => {
        const response = await api.post("/flows/comment", data);
        return response.data;
    },

    // GET /flows/comment/flow-share/:flowShareId
    getCommentsByFlowShare: async (flowShareId: string) => {
        const response = await api.get(
            `/flows/comment/flow-share/${flowShareId}`,
        );
        return response.data;
    },

    // GET /flows/comment/:id
    getCommentById: async (id: string) => {
        const response = await api.get(`/flows/comment/${id}`);
        return response.data;
    },

    // PATCH /flows/comment/:id
    updateComment: async (
        id: string,
        data: {
            comment?: string;
            parentId?: string | null;
        },
    ) => {
        const response = await api.patch(`/flows/comment/${id}`, data);
        return response.data;
    },

    // DELETE /flows/comment/:id
    removeComment: async (id: string) => {
        const response = await api.delete(`/flows/comment/${id}`);
        return response.data;
    },
};
