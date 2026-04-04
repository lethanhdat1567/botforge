import { http } from "@/http/fetch";

export type NotificationType =
    | "comment"
    | "reply"
    | "download"
    | "new_user"
    | "chat_message";

export interface Notification {
    id: string;
    userId: string;
    type: NotificationType;
    message: string;
    thumbnail?: string | null;
    relatedId: string;
    read: boolean;
    createdAt: string;
    updatedAt: string;
}

/** Payload socket `notification:new` từ BE. */
export type NewNotificationSocketPayload = {
    notification: Notification;
};

export interface GetNotificationsParams {
    limit?: number;
    search?: string;
}

/** Envelope JSON từ BE `res.success(data)`. */
type ApiSuccess<T> = {
    status: string;
    data: T;
};

function unwrap<T>(body: ApiSuccess<T>): T {
    return body.data;
}

export const notificationService = {
    getNotifications: async (
        params?: GetNotificationsParams,
    ): Promise<Notification[]> => {
        const res = await http.get<ApiSuccess<Notification[]>>(
            "/api/notifications",
            params
                ? {
                      params: params as Record<
                          string,
                          string | number | boolean | undefined
                      >,
                  }
                : undefined,
        );
        return unwrap(res);
    },

    getUnreadCount: async (): Promise<number> => {
        const res = await http.get<ApiSuccess<{ count: number }>>(
            "/api/notifications/unread-count",
        );
        return unwrap(res).count;
    },

    markAsRead: async (id: string): Promise<void> => {
        await http.put<ApiSuccess<unknown>>(
            `/api/notifications/${id}/read`,
            {},
        );
    },

    markAllAsRead: async (): Promise<void> => {
        await http.put<ApiSuccess<unknown>>("/api/notifications/read-all", {});
    },
};
