import { http } from "@/http/fetch";
import { baseResponse } from "@/types/response";

interface UpsertPageService {
    pageUid: string;
    pageAccessToken: string;
}

export interface Page {
    id: string;
    flowId: string;
    pageUid: string;
}

export const pageService = {
    async detail(flowId: string): Promise<Page> {
        const res: baseResponse<Page> = await http.get(`/api/pages/${flowId}`);

        return res.data;
    },

    async upsert(flowId: string, data: UpsertPageService) {
        const res = await http.post(`/api/pages/connect/${flowId}`, data);

        return res;
    },

    async delete(flowId: string) {
        const res = await http.delete(`/api/pages/${flowId}`);

        return res;
    },
};
