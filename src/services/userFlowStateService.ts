import api from "@/config/axios";

export const userFlowStateService = {
    /**
     * Lấy toàn bộ flow state của 1 platform user
     * GET /user-flow-states?platformUserId=xxx
     */
    getByPlatformUser: async (platformUserId: string) => {
        const response = await api.get("/flow-states", {
            params: { platformUserId },
        });
        return response.data;
    },

    /**
     * Lấy toàn bộ flow state của 1 owner
     * GET /user-flow-states/owner
     */
    getByOwner: async () => {
        const response = await api.get("/flow-states/owner");
        return response.data;
    },

    /**
     * Lấy chi tiết 1 flow state
     * GET /user-flow-states/:id
     */
    getById: async (id: string) => {
        const response = await api.get(`/flow-states/${id}`);
        return response.data;
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
        const response = await api.post("/flow-states", data);
        return response.data;
    },

    /**
     * Update flow state theo id
     * PATCH /user-flow-states/:id
     */
    update: async (id: string, data: any) => {
        const response = await api.patch(`/flow-states/${id}`, data);
        return response.data;
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
        const response = await api.patch("/flow-states/platform/step", data);
        return response.data;
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
        const response = await api.patch("/flow-states/platform/status", data);
        return response.data;
    },

    /**
     * Xoá flow state
     * DELETE /user-flow-states/:id
     */
    destroy: async (id: string) => {
        const response = await api.delete(`/flow-states/${id}`);
        return response.data;
    },
};
