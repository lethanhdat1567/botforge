"use client";

import { useEffect, useState } from "react";
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
    Notification as NotificationType,
} from "@/services/notificationService";
import { Bell } from "lucide-react";
import Link from "next/link";
import { useNotificationSocket } from "@/hooks/use-notification-socket";
import { useAuthStore } from "@/store/authStore";
import {
    requestNotificationPermission,
    showSystemNotification,
} from "@/lib/notificationPermission";

function Notification() {
    const [notifications, setNotifications] = useState<NotificationType[]>([]);
    const [open, setOpen] = useState(false);
    const user = useAuthStore((state) => state.user);
    const [hasUnread, setHasUnread] = useState(false);
    async function fetchNotifications() {
        try {
            const res = await notificationService.getNotifications();
            setNotifications(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    // Fetch notifications
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchNotifications();
    }, [open]);

    // Check unread
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setHasUnread(notifications.some((notification) => !notification.read));
    }, [notifications]);

    // Realtime notification
    useNotificationSocket(user?.id, () => {
        fetchNotifications();
        if (document.visibilityState === "hidden") {
            showSystemNotification();
        }
    });

    // Request notification permission
    useEffect(() => {
        requestNotificationPermission();
    }, []);

    async function handleCheckNoti() {
        await fetchNotifications();
        setHasUnread(notifications.some((notification) => !notification.read));
        setOpen(false);
    }

    if (!notifications.length) return null;

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative">
                    <Bell />
                    {hasUnread && (
                        <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
                    )}
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                className="max-h-130 w-100 overflow-hidden rounded-none"
                side="bottom"
                align="end"
            >
                <div className="flex items-center justify-between p-4">
                    <h2 className="text-sm font-medium">Notifications</h2>

                    <Link
                        href={"/notifications" as any}
                        className="cursor-pointer text-xs hover:underline"
                        onClick={() => setOpen(false)}
                    >
                        View all
                    </Link>
                </div>

                <Separator />

                <div className="h-[calc(100%-52px)] overflow-auto">
                    {notifications.map((notification) => (
                        <NotificationItem
                            key={notification.id}
                            notification={notification}
                            onClick={handleCheckNoti}
                        />
                    ))}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default Notification;
