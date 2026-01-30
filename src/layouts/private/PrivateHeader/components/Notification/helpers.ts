import { NotificationType } from "@/services/notificationService";

export function getNotificationHref(
    type: NotificationType,
    relatedId: string,
): string {
    switch (type) {
        case "comment":
        case "reply":
            // comment / reply của flow
            return `/community/templates/${relatedId}`;

        case "download":
            // download 1 flow / template
            return `/community/templates/${relatedId}`;

        case "flow_done":
            return `/flows/${relatedId}?status=done`;

        case "flow_cancelled":
            return `/flows/${relatedId}?status=cancelled`;

        case "chat_message":
            return `/chat/${relatedId}`;

        case "new_user":
            return `/users/${relatedId}`;

        default:
            return "/";
    }
}
