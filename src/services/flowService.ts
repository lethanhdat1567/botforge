import { http } from "@/http/fetch";

// --- Types ---
export type FlowStatus = "active" | "inactive";

export interface ListQuery {
    status?: FlowStatus;
    platform?: "facebook" | "instagram" | "zalo";
    q?: string;
    page?: string | number;
    limit?: string | number;
}

export interface CreateFlowPayload {
    name: string;
    description?: string;
    status?: FlowStatus | "draft" | "published";
    logicJson?: any;
    layoutJson?: any;
    timeoutJson?: any;
    pageId?: string;
    startNodeId?: string;
}

// Giả định cấu trúc Response chung của bạn
interface ApiResponse<T> {
    data: T;
    message: string;
    status: number;
}

export interface FlowList {
    id: string;
    name: string;
    description: string | null;
    pageId: string | null;
    status: FlowStatus;
    createdAt: string;
    updatedAt: string;
    page?: {
        id: string;
        pageUid: string;
    };
    isConnected: boolean;
}

// --- Service ---
export const flowService = {
    getFlows: async (query?: ListQuery) => {
        const res = await http.get<ApiResponse<{ flows: FlowList[] }>>(
            "/api/flows",
            {
                params: query as any,
            },
        );

        return res.data;
    },

    /**
     * Lấy chi tiết 1 Flow
     * BE: FlowController.detail -> FlowService.detail
     * cache: no-store — tránh reload dùng bản GET cũ sau khi đã PATCH.
     */
    getFlowDetail: (
        id: string,
        options?: { signal?: AbortSignal },
    ) => {
        return http.get<ApiResponse<any>>(`/api/flows/${id}`, {
            cache: "no-store",
            signal: options?.signal,
        });
    },

    /**
     * Tạo mới Flow
     * BE: FlowController.create -> FlowService.create
     */
    createFlow: (payload: CreateFlowPayload) => {
        return http.post<ApiResponse<any>>("/api/flows", payload);
    },

    /**
     * Cập nhật Flow (Partial update)
     * BE: FlowController.update -> FlowService.update
     */
    updateFlow: (id: string, payload: Partial<CreateFlowPayload>) => {
        return http.patch<ApiResponse<any>>(`/api/flows/${id}`, payload);
    },

    /**
     * Xóa 1 Flow
     * BE: FlowController.remove -> FlowService.remove
     */
    removeFlow: (id: string) => {
        return http.delete<ApiResponse<any>>(`/api/flows/${id}`);
    },

    destroyFlow: (id: string) => {
        return flowService.removeFlow(id);
    },

    /**
     * Xóa nhiều Flow cùng lúc
     * BE: FlowController.removeMany (nhận req.body.ids)
     */
    removeManyFlows: (ids: string[]) => {
        // Vì helper http.delete của bạn không nhận tham số body thứ 2,
        // chúng ta truyền thông qua options
        return http.delete<ApiResponse<any>>("/api/flows", {
            body: { ids },
        } as any);
    },

    /**
     * Nhân bản Flow
     * BE: FlowController.duplicate -> FlowService.duplicate
     */
    duplicateFlow: (id: string) => {
        return http.post<ApiResponse<any>>(`/api/flows/${id}/duplicate`, {});
    },

    /**
     * Danh sách dành cho Admin
     * BE: FlowController.listForAdmin
     */
    getFlowsForAdmin: (query?: ListQuery) => {
        return http.get<ApiResponse<FlowList>>("/api/flows/admin/list", {
            params: query as any,
        });
    },

    toggleActive: (id: string) => {
        return http.patch<ApiResponse<FlowList>>(
            `/api/flows/toggle-active/${id}`,
            {},
        );
    },
};
