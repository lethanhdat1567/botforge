import envConfig from "@/config/envConfig";
import { getOrCreateLiveChatAnonymousId } from "@/lib/live-chat-identity";
import { io, type Socket } from "socket.io-client";

export type ChatSocketConnectArgs =
    | { userId: string; role?: "admin" | "user"; conversationId?: string }
    | { anonymousId: string; conversationId?: string };

function buildQuery(args: ChatSocketConnectArgs): Record<string, string> {
    if ("userId" in args) {
        const q: Record<string, string> = { userId: args.userId };
        if (args.role) {
            q.role = args.role;
        }
        if (args.conversationId) {
            q.conversationId = args.conversationId;
        }
        return q;
    }

    const q: Record<string, string> = { anonymousId: args.anonymousId };
    if (args.conversationId) {
        q.conversationId = args.conversationId;
    }
    return q;
}

/** Mỗi lần gọi tạo socket riêng; nhớ `disconnect()` trong cleanup effect. */
export function connectChatSocket(args: ChatSocketConnectArgs): Socket {
    return io(envConfig.BE_URL, { query: buildQuery(args) });
}

/** @deprecated Dùng `connectChatSocket({ userId, role })`. */
export function connectSocket(userId: string, role?: "admin" | "user"): Socket {
    return connectChatSocket({ userId, role });
}

export function connectAnonymousChatSocket(conversationId?: string): Socket {
    const anonymousId = getOrCreateLiveChatAnonymousId();
    return connectChatSocket({ anonymousId, conversationId });
}
