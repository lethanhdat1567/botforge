import { http } from "@/http/fetch";
import { baseResponse } from "@/types/response";

export type MyFlowShareDownloadItem = {
    id: string;
    createdAt: string;
    flowShare: {
        id: string;
        name: string;
        description: string | null;
        thumbnail: string | null;
    };
};

export type AdminFlowShareDownloadUser = {
    id: string;
    displayName: string | null;
    avatar: string | null;
    username: string | null;
};

export type AdminFlowShareDownloadItem = {
    id: string;
    createdAt: string;
    flowShare: {
        id: string;
        name: string;
        thumbnail: string | null;
    };
    user: AdminFlowShareDownloadUser;
};

export type FlowShareDownloadRecord = {
    id: string;
    flowShareId: string;
    userId: string;
    createdAt: string;
    clonedFlowId?: string | null;
};

/** POST / — lần tải đầu: đã tạo flow bản sao */
export type DownloadFlowSuccessData = {
    flowShareDowload: FlowShareDownloadRecord;
    flow: { id: string; name: string };
};

/** POST / — đã tải trước đó (có thể kèm flow nếu DB có clonedFlowId) */
export type DownloadFlowAlreadyData = {
    message: string;
    flow?: { id: string; name: string };
};

export type DownloadFlowResponseData =
    | DownloadFlowSuccessData
    | DownloadFlowAlreadyData;

export type FlowShareDownloadListParams = {
    q?: string;
    page?: string | number;
    limit?: string | number;
};

export const flowShareDowloadService = {
    checkStatus: async (flowShareId: string) => {
        const response = await http.get<
            baseResponse<{ isDownloaded: boolean }>
        >(`/api/flow-share-downloads/status/${flowShareId}`);
        return response.data;
    },

    listMine: async (params?: FlowShareDownloadListParams) => {
        const response = await http.get<
            baseResponse<{
                flowShareDowloads: MyFlowShareDownloadItem[];
                meta: unknown;
            }>
        >(`/api/flow-share-downloads/me`, { params });
        return response.data;
    },

    /** Tải bản share về: tạo Flow mới (tên unique) + ghi download */
    download: async (flowShareId: string) => {
        const response = await http.post<
            baseResponse<DownloadFlowResponseData>
        >(`/api/flow-share-downloads`, { flowShareId });
        return response.data;
    },

    listForAdmin: async (params?: FlowShareDownloadListParams) => {
        const response = await http.get<
            baseResponse<{
                flowShareDowloads: AdminFlowShareDownloadItem[];
                meta: unknown;
            }>
        >(`/api/flow-share-downloads/admin`, { params });
        return response.data;
    },

    remove: async (id: string) => {
        const response = await http.delete<baseResponse<string>>(
            `/api/flow-share-downloads/${id}`,
        );
        return response.data;
    },

    removeMany: async (ids: string[]) => {
        const response = await http.post<baseResponse<string>>(
            `/api/flow-share-downloads/delete-many`,
            { ids },
        );
        return response.data;
    },
};

export function isDownloadFlowSuccess(
    data: DownloadFlowResponseData,
): data is DownloadFlowSuccessData {
    return "flow" in data && "flowShareDowload" in data;
}

/** Lấy flow đích sau POST download (lần đầu hoặc đã tải có clonedFlowId). */
export function getDownloadFlowTarget(
    data: DownloadFlowResponseData,
): { id: string; name: string } | undefined {
    if (isDownloadFlowSuccess(data)) {
        return data.flow;
    }
    if ("flow" in data && data.flow) {
        return data.flow;
    }
    return undefined;
}
