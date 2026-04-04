import { useEffect, useRef } from "react";
import { SocketEvent } from "@/socket/socket.events";
import { connectSocket } from "@/socket/socket";
import type { NewNotificationSocketPayload } from "@/services/notificationService";

export function useNotificationSocket(
    userId: string | undefined,
    onNewNotification: (payload: NewNotificationSocketPayload) => void,
) {
    const handlerRef = useRef(onNewNotification);
    handlerRef.current = onNewNotification;

    useEffect(() => {
        if (!userId) return;

        const socket = connectSocket(userId);

        const handler = (payload: NewNotificationSocketPayload) => {
            handlerRef.current(payload);
        };

        socket.on(SocketEvent.NEW_NOTIFICATION, handler);

        return () => {
            socket.off(SocketEvent.NEW_NOTIFICATION, handler);
            socket.disconnect();
        };
    }, [userId]);
}
