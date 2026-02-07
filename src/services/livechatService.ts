import api from "@/config/axios";

/* =====================
 * Types
 * ===================== */

export type ChatMessageType = "text" | "image" | "video";

export type ChatMessage = {
    id: string;
    sender: "user" | "admin";
    type: ChatMessageType;
    content: string;
    createdAt: string;
    readAt?: string | null;
    revokedAt?: string | null;
};

export type AdminConversationItem = {
    id: string;
    conversationId: string;
    userId: string;
    displayName: string;
    avatar?: string | null;
    lastMessage: string;
    lastMessageAt: string | null;
    unreadCount: number;
};

/* =====================
 * Service
 * ===================== */

export const chatService = {
    /**
     * Admin: list conversations (sidebar)
     * GET /chat/conversations
     */
    listConversations: async (params?: { q?: string }) => {
        const res = await api.get("/chat/conversations", {
            params: params?.q
                ? {
                      q: params.q,
                  }
                : undefined,
        });

        return res.data;
    },

    /**
     * List messages
     * - Admin: truyền userId
     * - User: không cần
     * GET /chat?userId=
     */
    listMessages: async (params?: { userId?: string }) => {
        const res = await api.get("/chat", {
            params,
        });

        return res.data;
    },

    /**
     * Send message
     * - Admin: cần userId
     * - User: không cần
     * POST /chat
     */
    sendMessage: async (data: {
        content: string;
        type?: ChatMessageType;
        userId?: string;
    }) => {
        const res = await api.post("/chat", {
            content: data.content,
            type: data.type ?? "text",
            userId: data.userId,
        });

        return res.data;
    },

    /**
     * Mark messages as read
     * - Admin: cần userId
     * - User: không cần
     * POST /chat/read
     */
    markRead: async (data?: { userId?: string }) => {
        const res = await api.post("/chat/read", data);
        return res.data;
    },

    /**
     * Revoke message
     * POST /chat/revoke
     */
    revokeMessage: async (messageId: string) => {
        const res = await api.post("/chat/revoke", { messageId });
        return res.data;
    },
};
