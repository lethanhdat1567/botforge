import { useEffect } from "react";
import { SocketEvent } from "@/socket/socket.events";
import { connectSocket } from "@/socket/socket";

export function useChatSocket(
    userId: string | undefined,
    refetchConversations: () => void,
) {
    useEffect(() => {
        if (!userId) return;

        const socket = connectSocket(userId);

        const refetch = () => {
            refetchConversations();
        };

        socket.on(SocketEvent.CHAT_NEW_MESSAGE, refetch);
        socket.on(SocketEvent.CHAT_MESSAGE_REVOKED, refetch);

        return () => {
            socket.off(SocketEvent.CHAT_NEW_MESSAGE, refetch);
            socket.off(SocketEvent.CHAT_MESSAGE_REVOKED, refetch);
        };
    }, [userId]);
}
