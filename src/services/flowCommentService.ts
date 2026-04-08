import { http } from "@/http/fetch";

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
        const response = await http.post("/api/flows/comment", data);
        return response;
    },

    // GET /flows/comment/flow-share/:flowShareId
    getCommentsByFlowShare: async (flowShareId: string) => {
        const response = await http.get(
            `/api/flows/comment/flow-share/${flowShareId}`,
        );
        return response;
    },

    // GET /flows/comment/:id
    getCommentById: async (id: string) => {
        const response = await http.get(`/api/flows/comment/${id}`);
        return response;
    },

    // PATCH /flows/comment/:id
    updateComment: async (
        id: string,
        data: {
            comment?: string;
            parentId?: string | null;
        },
    ) => {
        const response = await http.patch(`/api/flows/comment/${id}`, data);
        return response;
    },

    // DELETE /flows/comment/:id
    removeComment: async (id: string) => {
        const response = await http.delete(`/api/flows/comment/${id}`);
        return response;
    },
};
