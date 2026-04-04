"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import NotificationItem from "@/layouts/private/PrivateHeader/components/Notification/NotificationItem";
import {
    notificationService,
    Notification as NotificationRow,
    type NewNotificationSocketPayload,
} from "@/services/notificationService";
import { Bell } from "lucide-react";
import { useNotificationSocket } from "@/hooks/use-notification-socket";
import { useAuthStore } from "@/store/authStore";
import {
    requestNotificationPermission,
    showSystemNotification,
} from "@/lib/notificationPermission";

function normalizeIncoming(n: NotificationRow): NotificationRow {
    return {
        ...n,
        createdAt:
            typeof n.createdAt === "string" ? n.createdAt : String(n.createdAt),
        updatedAt:
            typeof n.updatedAt === "string" ? n.updatedAt : String(n.updatedAt),
    };
}

function Notification() {
    const [notifications, setNotifications] = useState<NotificationRow[]>([]);
    const [open, setOpen] = useState(false);
    const user = useAuthStore((state) => state.user);
    const [unreadCount, setUnreadCount] = useState(0);

    const refreshUnreadCount = useCallback(async () => {
        if (!user?.id) return;
        try {
            const count = await notificationService.getUnreadCount();
            setUnreadCount(count);
        } catch {
            /* ignore */
        }
    }, [user?.id]);

    const fetchNotifications = useCallback(async () => {
        if (!user?.id) return;
        try {
            const list = await notificationService.getNotifications();
            setNotifications(list);
        } catch {
            /* ignore */
        }
    }, [user?.id]);

    useEffect(() => {
        if (!user?.id) return;
        void fetchNotifications();
        void refreshUnreadCount();
    }, [user?.id, fetchNotifications, refreshUnreadCount]);

    useEffect(() => {
        if (!open || !user?.id) return;
        void fetchNotifications();
        void refreshUnreadCount();
    }, [open, user?.id, fetchNotifications, refreshUnreadCount]);

    const onSocketPayload = useCallback(
        (payload: NewNotificationSocketPayload) => {
            if (!payload?.notification) return;
            const n = normalizeIncoming(payload.notification);
            setNotifications((prev) => {
                if (prev.some((x) => x.id === n.id)) return prev;
                return [n, ...prev];
            });
            if (!n.read) {
                setUnreadCount((c) => c + 1);
            }
            if (document.visibilityState === "hidden") {
                showSystemNotification();
            }
        },
        [],
    );

    useNotificationSocket(user?.id, onSocketPayload);

    useEffect(() => {
        requestNotificationPermission();
    }, []);

    async function handleMarkAllRead() {
        try {
            await notificationService.markAllAsRead();
            setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
            setUnreadCount(0);
        } catch {
            /* ignore */
        }
    }

    if (!user?.id) return null;

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="relative shrink-0"
                    aria-label="Thông báo"
                >
                    <Bell className="size-3" />
                    {unreadCount > 0 ? (
                        <span className="ring-background absolute top-1 right-1 size-2 rounded-full bg-red-500 ring-2" />
                    ) : null}
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                className="flex w-[min(100vw-2rem,22rem)] flex-col overflow-hidden rounded-lg border p-0 shadow-lg"
                side="bottom"
                align="end"
                sideOffset={8}
            >
                <div className="flex items-center justify-between gap-2 px-4 py-3">
                    <h2 className="text-sm font-semibold">Notifications</h2>
                    <button
                        type="button"
                        className="text-muted-foreground hover:text-foreground text-xs font-medium hover:underline disabled:pointer-events-none disabled:opacity-50"
                        onClick={() => void handleMarkAllRead()}
                        disabled={unreadCount === 0}
                    >
                        Đọc tất cả
                    </button>
                </div>

                <Separator />

                {notifications.length === 0 ? (
                    <div className="text-muted-foreground px-4 py-8 text-center text-sm">
                        Chưa có thông báo
                    </div>
                ) : (
                    <div className="max-h-[min(70vh,24rem)] overflow-y-auto overscroll-contain">
                        {notifications.map((notification) => (
                            <NotificationItem
                                key={notification.id}
                                notification={notification}
                                onNavigate={() => setOpen(false)}
                                onMarkedRead={(id) => {
                                    setNotifications((prev) =>
                                        prev.map((n) =>
                                            n.id === id
                                                ? { ...n, read: true }
                                                : n,
                                        ),
                                    );
                                    setUnreadCount((c) => Math.max(0, c - 1));
                                }}
                            />
                        ))}
                    </div>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default Notification;
