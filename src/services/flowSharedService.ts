import api from "@/config/axios";

export type SharedUser = {
    id: string;
    username: string;
    displayName: string;
    avatar: string;
    email: string;
};

export type SharedType = {
    id: string;
    flowId: string;
    userId: string;

    name: string;
    description: string;
    thumbnail: string | null;

    status: "active" | "inactive";
    downloadCount: number;

    createdAt: string;
    updatedAt: string;

    user: SharedUser;
};

export const flowSharedService = {
    // GET /flows/shared
    getAllShared: async () => {
        const response = await api.get("/flows/shared");
        return response.data;
    },

    // GET /flows/shared/me
    getMyShared: async () => {
        const response = await api.get("/flows/shared/me");
        return response.data;
    },

    // GET /flows/shared/:id
    getSharedById: async (id: string) => {
        const response = await api.get(`/flows/shared/${id}`);
        return response.data;
    },

    // POST /flows/shared
    // có upload thumbnail => dùng FormData
    createShared: async (data: {
        flowId: string;
        name: string;
        description?: string;
        thumbnail?: File;
    }) => {
        const formData = new FormData();
        formData.append("flowId", data.flowId);
        formData.append("name", data.name);

        if (data.description) {
            formData.append("description", data.description);
        }

        if (data.thumbnail) {
            formData.append("thumbnail", data.thumbnail);
        }

        const response = await api.post("/flows/shared", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data;
    },

    // PATCH /flows/shared/:id
    updateShared: async (
        id: string,
        data: {
            flowId?: string;
            name?: string;
            description?: string;
            thumbnail?: File;
        },
    ) => {
        const formData = new FormData();

        if (data.name) {
            formData.append("name", data.name);
        }

        if (data.description) {
            formData.append("description", data.description);
        }

        if (data.thumbnail) {
            formData.append("thumbnail", data.thumbnail);
        }

        const response = await api.patch(`/flows/shared/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data;
    },

    // PATCH /flows/shared/:id/dowload
    downloadShared: async (
        id: string,
        data: {
            flowId: string;
            folderId: string | null;
            pageId: string | null;
        },
    ) => {
        const response = await api.patch(`/flows/shared/${id}/download`, data);
        return response.data;
    },

    // DELETE /flows/shared/:id
    removeShared: async (id: string) => {
        const response = await api.delete(`/flows/shared/${id}`);
        return response.data;
    },

    deleteManyShared: async (ids: string[]) => {
        const response = await api.post("/flows/shared/delete-many", {
            ids,
        });
        return response.data;
    },
};
