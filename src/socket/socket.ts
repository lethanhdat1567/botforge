import envConfig from "@/config/envConfig";
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export function connectSocket(userId: string) {
    socket = io(envConfig.BE_URL, {
        query: { userId },
    });

    return socket;
}

export function disconnectSocket() {
    socket?.disconnect();
    socket = null;
}
