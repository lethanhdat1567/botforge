import envConfig from "@/config/envConfig";
import { http } from "@/http/fetch";
import { HttpError } from "@/http/helpers";
import type {
    AdminConversationListRow,
    ConversationDto,
    MessageDto,
} from "@/types/live-chat";

type ApiEnvelope<T> = {
    status: string;
    data: T;
};

function unwrap<T>(body: ApiEnvelope<T>): T {
    if (body.status !== "success") {
        throw new Error("API response không thành công");
    }
    return body.data;
}

export function resolveChatMediaUrl(fileUrl: string | null | undefined): string | null {
    if (!fileUrl) {
        return null;
    }
    if (fileUrl.startsWith("http://") || fileUrl.startsWith("https://")) {
        return fileUrl;
    }
    const base = envConfig.BE_URL.replace(/\/$/, "");
    return `${base}${fileUrl.startsWith("/") ? "" : "/"}${fileUrl}`;
}

function extractMessageItems(raw: unknown): MessageDto[] {
    if (!raw) {
        return [];
    }
    if (Array.isArray(raw)) {
        if (raw.length >= 1 && Array.isArray(raw[0])) {
            return raw[0] as MessageDto[];
        }
        return raw as MessageDto[];
    }
    if (typeof raw === "object" && raw !== null && "items" in raw) {
        return ((raw as { items: MessageDto[] }).items ?? []) as MessageDto[];
    }
    return [];
}

export const liveChatApi = {
    async getCurrentConversation(): Promise<ConversationDto> {
        const res = await http.get<ApiEnvelope<ConversationDto>>(
            "/api/conversations/current",
        );
        return unwrap(res);
    },

    /** Tạo hoặc tiếp tục hội thoại (khách / user). */
    async createConversation(): Promise<ConversationDto> {
        const res = await http.post<ApiEnvelope<{ message: string; data: ConversationDto }>>(
            "/api/conversations",
            {},
        );
        const body = unwrap(res);
        return body.data;
    },

    async ensureOpenConversation(): Promise<ConversationDto> {
        try {
            return await liveChatApi.getCurrentConversation();
        } catch (e) {
            if (e instanceof HttpError && e.status === 404) {
                return liveChatApi.createConversation();
            }
            throw e;
        }
    },

    async listAdminConversations(): Promise<AdminConversationListRow[]> {
        const res = await http.get<ApiEnvelope<AdminConversationListRow[]>>(
            "/api/conversations/list",
        );
        return unwrap(res);
    },

    async fetchMessages(
        conversationId: string,
        params?: { page?: number; limit?: number },
    ): Promise<MessageDto[]> {
        const res = await http.get<ApiEnvelope<unknown>>("/api/messages", {
            params: {
                conversationId,
                page: params?.page ?? 1,
                limit: params?.limit ?? 80,
            },
        });
        const raw = unwrap(res);
        return extractMessageItems(raw);
    },

    async sendTextMessage(conversationId: string, content: string): Promise<MessageDto> {
        const res = await http.post<ApiEnvelope<MessageDto>>("/api/messages", {
            conversationId,
            content,
        });
        return unwrap(res);
    },

    async markConversationRead(conversationId: string): Promise<void> {
        await http.patch<ApiEnvelope<unknown>>(
            `/api/messages/read-all/${conversationId}`,
            {},
        );
    },
};
