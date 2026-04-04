"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    getNotificationHref,
    getNotificationTitle,
} from "@/layouts/private/PrivateHeader/components/Notification/helpers";
import { resolveMediaSrc } from "@/lib/image";
import { timeAgo } from "@/lib/timer";
import {
    Notification,
    notificationService,
} from "@/services/notificationService";
import { useAuthStore } from "@/store/authStore";
import { Clock } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
    notification: Notification;
    onNavigate?: () => void;
    onMarkedRead?: (id: string) => void;
};

function NotificationItem({
    notification,
    onNavigate,
    onMarkedRead,
}: Props) {
    const router = useRouter();
    const role = useAuthStore((s) => s.user?.role);

    function handleClick() {
        if (!notification.read) {
            void notificationService.markAsRead(notification.id);
            onMarkedRead?.(notification.id);
        }
        const href = getNotificationHref(
            notification.type,
            notification.relatedId,
            { role },
        );
        router.push(href);
        onNavigate?.();
    }

    const title = getNotificationTitle(notification.type);
    const fallbackLetter = title.slice(0, 1).toUpperCase();

    return (
        <button
            type="button"
            className="hover:bg-muted/50 relative flex w-full cursor-pointer items-start gap-3 border-b px-4 py-3 text-left transition last:border-b-0"
            onClick={handleClick}
        >
            <Avatar className="h-10 w-10 shrink-0">
                {notification.thumbnail ? (
                    <AvatarImage
                        src={
                            resolveMediaSrc(notification.thumbnail) as string
                        }
                        alt=""
                    />
                ) : null}
                <AvatarFallback className="text-xs">
                    {fallbackLetter}
                </AvatarFallback>
            </Avatar>

            <div className="min-w-0 flex-1 space-y-1 pr-5">
                <p className="text-sm font-semibold leading-tight">
                    {title}
                </p>
                <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                    {notification.message}
                </p>
                <span className="text-muted-foreground flex items-center gap-1 text-xs">
                    <Clock className="size-3 shrink-0" aria-hidden />
                    {timeAgo(notification.createdAt)}
                </span>
            </div>

            {!notification.read ? (
                <span
                    className="absolute top-1/2 right-3 size-2 -translate-y-1/2 rounded-full bg-red-500"
                    aria-hidden
                />
            ) : null}
        </button>
    );
}

export default NotificationItem;
