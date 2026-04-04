import { NotificationType } from "@/services/notificationService";

const titles: Record<NotificationType, string> = {
    comment: "Bình luận mới",
    reply: "Trả lời bình luận",
    download: "Tải xuống flow",
    new_user: "Người dùng mới",
    chat_message: "Tin nhắn hỗ trợ",
};

export function getNotificationTitle(type: NotificationType): string {
    return titles[type] ?? "Thông báo";
}

export function getNotificationHref(
    type: NotificationType,
    relatedId: string,
    opts?: { role?: string },
): string {
    switch (type) {
        case "comment":
        case "reply":
        case "download":
            return `/marketplace/${relatedId}`;

        case "chat_message":
            return opts?.role === "admin"
                ? "/admin/support/chat"
                : "/support/chat";

        case "new_user":
            return "/admin/users";

        default:
            return "/";
    }
}
