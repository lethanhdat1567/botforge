"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getNotificationHref } from "@/layouts/private/PrivateHeader/components/Notification/helpers";
import { resolveMediaSrc } from "@/lib/image";
import { timeAgo } from "@/lib/timer";
import {
    Notification,
    notificationService,
} from "@/services/notificationService";
import { useAuthStore } from "@/store/authStore";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

type Props = {
    notification: Notification;
};

function NotificationItem({ notification }: Props) {
    const router = useRouter();
    const role = useAuthStore((s) => s.user?.role);
    const isUnread = !notification.read;

    function handleRead() {
        if (isUnread) {
            void notificationService.markAsRead(notification.id);
        }
        const href = getNotificationHref(
            notification.type,
            notification.relatedId,
            { role },
        );
        router.push(href);
    }

    return (
        <div
            className={cn(
                "hover:bg-muted relative grid cursor-pointer grid-cols-[40px_1fr_120px_100px] items-center gap-4 border-b px-6 py-4 transition",
                isUnread && "border-l-2 border-l-red-500 bg-red-50 hover:bg-red-100",
            )}
            onClick={handleRead}
        >
            <div className="flex justify-center">
                <Avatar className="h-10 w-10">
                    {notification.thumbnail ? (
                        <AvatarImage
                            src={
                                resolveMediaSrc(
                                    notification.thumbnail,
                                ) as string
                            }
                        />
                    ) : null}
                    <AvatarFallback>
                        {notification.type.slice(0, 1).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
            </div>

            <p
                className={cn(
                    "line-clamp-2 text-sm",
                    isUnread ? "font-semibold" : "font-medium",
                )}
            >
                {notification.message}
            </p>

            <span className="text-muted-foreground text-center text-sm capitalize">
                {notification.type}
            </span>

            <span className="text-muted-foreground text-right text-sm">
                {timeAgo(notification.createdAt)}
            </span>
        </div>
    );
}

export default NotificationItem;
