import { http } from "@/http/fetch";
import { baseResponse } from "@/types/response";

export enum FlowRecordStatus {
    running = "running",
    pending = "pending",
    processing = "processing",
    completed = "completed",
    cancelled = "cancelled",
    error = "error",
}

export type FlowRecord = {
    id: string;
    senderId: string;
    flowId: string;
    currentNodeId: string | null;
    variables: Record<string, any>;
    status: FlowRecordStatus | string;
    lastInteraction: string;
    errorLog: string | null;
    waitingForVariable: string | null;
    expiresAt: string | null;
    createdAt?: string;
    updatedAt?: string;
};

export type FlowRecordFilter = {
    status?: string;
    q?: string;
    page?: number;
    limit?: number;
};

export const flowRecordService = {
    list: async (filter: FlowRecordFilter) => {
        const response = await http.get<
            baseResponse<{
                flowRecords: FlowRecord[];
                meta: {
                    pageCount: number;
                    currentPage: number;
                };
            }>
        >("/api/flow-records", { params: filter });
        return response.data;
    },

    delete: async (id: string) => {
        const response = await http.delete<baseResponse<{ message: string }>>(
            `/api/flow-records/${id}`,
        );
        return response.data;
    },

    bulkDelete: async (ids: string[]) => {
        const response = await http.post<baseResponse<{ message: string }>>(
            "/api/flow-records/bulk",
            { ids },
        );
        return response.data;
    },
};
