import api from "@/config/axios";

export type NotificationType =
    | "comment"
    | "reply"
    | "download"
    | "flow_done"
    | "flow_cancelled"
    | "new_user"
    | "chat_message";

export interface Notification {
    id: string;
    userId: string;
    type: NotificationType;
    message: string;
    avatar?: string | null;
    relatedId: string;
    read: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface GetNotificationsParams {
    limit?: number;
    search?: string;
}

export const notificationService = {
    // 📥 Lấy danh sách notification
    getNotifications: async (params?: GetNotificationsParams) => {
        const response = await api.get("/notifications", {
            params,
        });

        return response.data;
    },

    // ✅ Đánh dấu đã đọc 1 notification
    markAsRead: async (id: string) => {
        const response = await api.put(`/notifications/${id}/read`);
        return response.data;
    },

    // ✅ Đánh dấu đã đọc tất cả
    markAllAsRead: async () => {
        const response = await api.put("/notifications/read-all");
        return response.data;
    },

    // ➕ Tạo notification (admin / system)
    createNotification: async (payload: {
        userId: string;
        type: NotificationType;
        message: string;
        relatedId: string;
        avatar?: string | null;
    }) => {
        const response = await api.post("/notifications", payload);
        return response.data;
    },
};
