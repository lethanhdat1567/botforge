const STORAGE_KEY = "bf_live_chat_anonymous_id";

/** UUID lưu LocalStorage — F5 vẫn cùng khách ẩn danh (chỉ gọi trên client). */
export function getOrCreateLiveChatAnonymousId(): string {
    if (typeof window === "undefined") {
        return "";
    }

    let id = localStorage.getItem(STORAGE_KEY);
    const uuidRe =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    if (!id || !uuidRe.test(id)) {
        id = crypto.randomUUID();
        localStorage.setItem(STORAGE_KEY, id);
    }

    return id;
}
