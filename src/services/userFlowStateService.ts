import { http } from "@/http/fetch";

export const userFlowStateService = {
    /**
     * Lấy toàn bộ flow state của 1 platform user
     * GET /user-flow-states?platformUserId=xxx
     */
    getByPlatformUser: async (platformUserId: string) => {
        const response = await http.get("/api/flow-states", {
            params: { platformUserId },
        });
        return response;
    },

    /**
     * Lấy toàn bộ flow state của 1 owner
     * GET /user-flow-states/owner
     */
    getByOwner: async () => {
        const response = await http.get("/api/flow-states/owner");
        return response;
    },

    /**
     * Lấy chi tiết 1 flow state
     * GET /user-flow-states/:id
     */
    getById: async (id: string) => {
        const response = await http.get(`/api/flow-states/${id}`);
        return response;
    },

    /**
     * Tạo flow state mới
     * POST /user-flow-states
     */
    create: async (data: {
        platformUserId: string;
        flowId: string;
        pageId: string;
        currentStep: string;
        variables?: any;
        status?: string;
    }) => {
        const response = await http.post("/api/flow-states", data);
        return response;
    },

    /**
     * Update flow state theo id
     * PATCH /user-flow-states/:id
     */
    update: async (id: string, data: any) => {
        const response = await http.patch(`/api/flow-states/${id}`, data);
        return response;
    },

    /**
     * Append step + push vào stepHistory
     * PATCH /user-flow-states/platform/step
     */
    appendStep: async (data: {
        platformUserId: string;
        pageId: string;
        stepId: string;
    }) => {
        const response = await http.patch("/api/flow-states/platform/step", data);
        return response;
    },

    /**
     * Update hàng loạt state theo platformUserId + pageId
     * (pending / running)
     * PATCH /user-flow-states/platform/status
     */
    updateByPlatformAndPage: async (data: {
        platformUserId: string;
        pageId: string;
        data: any;
    }) => {
        const response = await http.patch("/api/flow-states/platform/status", data);
        return response;
    },

    /**
     * Xoá flow state
     * DELETE /user-flow-states/:id
     */
    deleteMany: async (ids: string[]) => {
        const response = await http.delete("/api/flow-states", {
            body: { ids },
        } as any);
        return response;
    },
};
