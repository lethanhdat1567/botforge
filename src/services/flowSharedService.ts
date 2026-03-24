import { http } from "@/http/fetch";
import { baseResponse } from "@/types/response";

export type FlowShareStatus = "active" | "inactive";

export interface FlowShare {
    id: string;
    flowId: string;
    name: string;
    description?: string;
    thumbnail?: string;
    status: FlowShareStatus;
    createdAt: string;
    updatedAt: string;
    content?: string;
    flow?: {
        id: string;
        name: string;
    };
    user?: {
        id: string;
        username: string;
        displayName: string;
        avatar?: string;
    };
}

export interface FlowShareListResponse {
    flowShares: FlowShare[];
    meta: {
        total: number;
        lastPage: number;
        currentPage: number;
        perPage: number;
        prev: number | null;
        next: number | null;
    };
}

export interface CreateFlowShareBody {
    flowId: string;
    name: string;
    description?: string;
    thumbnail?: string;
    content?: string;
    status?: FlowShareStatus;
}

const flowShareService = {
    // Lấy danh sách cho User (đã login)
    getList: async (params?: {
        q?: string;
        status?: string;
        page?: number;
        limit?: number;
    }) => {
        const res: baseResponse<FlowShareListResponse> = await http.get(
            "/api/flow-shares",
            {
                params,
            },
        );

        return res.data;
    },

    // Lấy danh sách cho Admin
    getListForAdmin: (params?: {
        q?: string;
        status?: string;
        page?: number;
        limit?: number;
    }) => http.get<FlowShareListResponse>("/api/flow-shares/admin", { params }),

    // Lấy danh sách Public (không cần login)
    getPublic: (params?: {
        q?: string;
        status?: string;
        page?: number;
        limit?: number;
    }) =>
        http.get<FlowShareListResponse>("/api/flow-shares/public", { params }),

    // Chi tiết 1 flow
    getDetail: async (id: string) => {
        const res = await http.get<baseResponse<FlowShare>>(
            `/api/flow-shares/${id}`,
        );

        return res.data;
    },

    // Lấy danh sách liên quan
    getRelated: (id: string) =>
        http.get<FlowShare[]>(`/api/flow-shares/related/${id}`),

    // Tạo mới
    create: (body: CreateFlowShareBody) =>
        http.post<FlowShare>("/api/flow-shares", body),

    // Cập nhật
    update: (id: string, body: Partial<CreateFlowShareBody>) =>
        http.put<FlowShare>(`/api/flow-shares/${id}`, body),

    // Xóa 1
    delete: (id: string) => http.delete<any>(`/api/flow-shares/${id}`),

    // Xóa nhiều
    deleteMany: (ids: string[]) =>
        http.post<any>("/api/flow-shares/delete-many", { ids }),
};

export default flowShareService;
