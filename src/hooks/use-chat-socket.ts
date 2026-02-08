import { useEffect } from "react";
import { SocketEvent } from "@/socket/socket.events";
import { connectSocket } from "@/socket/socket";

export function useChatSocket(
    userId: string | undefined,
    role: "admin" | "user",
    refetchConversations: () => void,
) {
    useEffect(() => {
        if (!userId) return;

        const socket = connectSocket(userId, role);

        const refetch = () => {
            refetchConversations();
        };

        socket.on(SocketEvent.CHAT_NEW_MESSAGE, refetch);
        socket.on(SocketEvent.CHAT_MESSAGE_REVOKED, refetch);

        if (role === "admin") {
            socket.on(SocketEvent.ADMIN_SIDEBAR_NEW_CHAT, refetch);
        }

        return () => {
            socket.off(SocketEvent.CHAT_NEW_MESSAGE, refetch);
            socket.off(SocketEvent.CHAT_MESSAGE_REVOKED, refetch);

            if (role === "admin") {
                socket.off(SocketEvent.ADMIN_SIDEBAR_NEW_CHAT, refetch);
            }

            socket.disconnect();
        };
    }, [userId, role]);
}
