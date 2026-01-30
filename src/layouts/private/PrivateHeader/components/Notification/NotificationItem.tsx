"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getNotificationHref } from "@/layouts/private/PrivateHeader/components/Notification/helpers";
import { resolveMediaSrc } from "@/lib/image";
import { timeAgo } from "@/lib/timer";
import {
    Notification,
    notificationService,
} from "@/services/notificationService";
import { Clock } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
    notification: Notification;
    onClick: () => void;
};

function NotificationItem({ notification, onClick }: Props) {
    const router = useRouter();

    function handleRead() {
        if (!notification.read) {
            notificationService.markAsRead(notification.id);
        }
        const href = getNotificationHref(
            notification.type,
            notification.relatedId,
        );
        router.push(href as any);
        onClick();
    }

    return (
        <div
            className={`hover:bg-muted relative flex cursor-pointer items-start gap-4 border-b p-2 transition ${!notification.read ? "bg-red-50 hover:bg-red-100" : ""} `}
            onClick={handleRead}
        >
            {notification?.avatar && (
                <Avatar className="h-10 w-10">
                    <AvatarImage
                        src={resolveMediaSrc(notification.avatar) as string}
                    />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            )}
            <div className="space-y-1">
                <p className="line-clamp-3 pr-8 text-sm">
                    {notification.message}
                </p>

                <span className="text-muted-foreground flex items-center gap-1 text-xs">
                    <Clock size={12} /> {timeAgo(notification.createdAt)}
                </span>
            </div>

            {!notification.read && (
                <div className="absolute top-3 right-2 rounded-full bg-red-500 p-1"></div>
            )}
        </div>
    );
}

export default NotificationItem;
