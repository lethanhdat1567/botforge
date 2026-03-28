/** Header / sidebar — thương hiệu hỗ trợ hoặc khách (admin đang xem). */
export type ChatThreadContact = {
    id: string;
    name: string;
    avatar: string;
};

export type LiveChatSidebarItem = {
    id: string;
    conversationId: string;
    name: string;
    time: string;
    preview: string;
    unread: number;
    avatar: string;
    /** Tin cuối do admin hay khách gửi — style preview / tick. */
    lastMessageRole: "admin" | "user" | null;
};

export type MessageDto = {
    id: string;
    conversationId: string;
    role: "admin" | "user";
    content: string | null;
    fileUrl: string | null;
    createdAt: string;
    revokedAt: string | null;
    readByAdmin: boolean;
    readByUser: boolean;
};

export type ConversationDto = {
    id: string;
    userId: string | null;
    guestName: string | null;
    anonymousParticipantId: string | null;
    status: string;
    createdAt: string;
    updatedAt: string;
};

export type AdminConversationListRow = ConversationDto & {
    _count: { messages: number };
    adminUnreadCount: number;
    lastMessage: {
        id: string;
        role: "admin" | "user";
        content: string | null;
        fileUrl: string | null;
        createdAt: string;
        readByAdmin: boolean;
    } | null;
    user?: {
        id: string;
        displayName: string | null;
        avatar: string | null;
    } | null;
    anonymousParticipant?: {
        id: string;
        displayName: string | null;
    } | null;
};

/** Payload socket `chat:new` từ BE. */
export type LiveChatSocketMessagePayload = {
    conversationId: string;
    id: string;
    sender: "admin" | "user";
    type: "text" | "image" | "video";
    content: string;
    createdAt: string;
};
