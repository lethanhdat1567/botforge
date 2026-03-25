import { http } from "@/http/fetch";
import { baseResponse } from "@/types/response";

export type FlowSharedCommentUser = {
    id: string;
    username: string;
    displayName: string;
    avatar: string;
};

export type FlowSharedComment = {
    id: string;
    userId: string;
    flowShareId: string;
    comment: string;
    parentId: string | null;
    createdAt: string;
    updatedAt: string;
    user: FlowSharedCommentUser;
    replies?: FlowSharedComment[];
};

export type CommentFilter = {
    sort?: "asc" | "desc";
    page?: number;
    limit?: number;
};

export type CreateCommentPayload = {
    flowShareId: string;
    comment: string;
    parentId?: string;
};

export const flowShareCommentService = {
    listByFlowShare: async (flowShareId: string, params?: CommentFilter) => {
        const response = await http.get<
            baseResponse<{ comments: FlowSharedComment[]; meta: any }>
        >(`/api/flow-share-comments/flow-share/${flowShareId}`, {
            params,
        });
        return response.data;
    },

    create: async (data: CreateCommentPayload) => {
        const response = await http.post<baseResponse<FlowSharedComment>>(
            `/api/flow-share-comments`,
            data,
        );
        return response.data;
    },

    update: async (id: string, comment: string) => {
        const response = await http.patch<baseResponse<FlowSharedComment>>(
            `/api/flow-share-comments/${id}`,
            { comment },
        );
        return response.data;
    },

    remove: async (id: string) => {
        const response = await http.delete<baseResponse<string>>(
            `/api/flow-share-comments/${id}`,
        );
        return response.data;
    },
};
