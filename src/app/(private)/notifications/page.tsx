"use client";

import NotificationItem from "@/app/(private)/notifications/components/NotificationItem/NotificationItem";
import SearchSection from "@/app/(private)/notifications/components/SearchSection/SearchSection";
import { Button } from "@/components/ui/button";
import { notificationService } from "@/services/notificationService";
import { CheckCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function NotificationPage() {
    const [notifications, setNotifications] = useState([]);

    const fetchNotification = async (searchValue?: string) => {
        try {
            const res = await notificationService.getNotifications({
                search: searchValue || "",
            });

            setNotifications(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchNotification();
    }, []);

    function handleSearching(value: string) {
        fetchNotification(value);
    }

    async function handleMarkAll() {
        try {
            await notificationService.markAllAsRead();
            toast.success("Marked all as read");
            fetchNotification();
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
                    {notifications.map((item: any) => (
                        <NotificationItem key={item.id} notification={item} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default NotificationPage;
