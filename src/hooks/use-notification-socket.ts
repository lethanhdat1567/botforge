import { useEffect } from "react";
import { SocketEvent } from "@/socket/socket.events";
import { connectSocket } from "@/socket/socket";

export function useNotificationSocket(
    userId: string | undefined,
    onNewNotification: () => void,
) {
    useEffect(() => {
        if (!userId) return;

        const socket = connectSocket(userId);

        socket.on(SocketEvent.NEW_NOTIFICATION, () => {
            onNewNotification();
        });

        return () => {
            socket.off(SocketEvent.NEW_NOTIFICATION);
        };
    }, [userId]);
}
