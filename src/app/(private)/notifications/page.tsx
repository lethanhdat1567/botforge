"use client";

import NotificationItem from "@/app/(private)/notifications/components/NotificationItem/NotificationItem";
import SearchSection from "@/app/(private)/notifications/components/SearchSection/SearchSection";
import { Button } from "@/components/ui/button";
import {
    notificationService,
    type Notification,
} from "@/services/notificationService";
import { CheckCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function NotificationPage() {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const fetchNotification = async (searchValue?: string) => {
        try {
            const list = await notificationService.getNotifications({
                search: searchValue || "",
            });
            setNotifications(list);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        void fetchNotification();
    }, []);

    function handleSearching(value: string) {
        void fetchNotification(value);
    }

    async function handleMarkAll() {
        try {
            await notificationService.markAllAsRead();
            toast.success("Marked all as read");
            void fetchNotification();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="mx-auto max-w-3xl">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Notifications</h1>
                <Button className="rounded-none" onClick={handleMarkAll}>
                    <CheckCheck /> Mark all as read
                </Button>
            </div>
            <div className="mt-6">
                <SearchSection onSearching={handleSearching} />
                <div className="mt-4 border">
                    {notifications.map((item) => (
                        <NotificationItem key={item.id} notification={item} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default NotificationPage;
