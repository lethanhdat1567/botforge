import type { LiveChatSidebarItem } from "@/types/live-chat";

/** @deprecated Dùng dữ liệu từ API; giữ type tương thích UI cũ. */
export type MockChatItem = LiveChatSidebarItem;

/** Static mock — chỉ còn dùng khi cần fallback dev. */
export const MOCK_CHATS: MockChatItem[] = [
    {
        id: "1",
        conversationId: "1",
        name: "Jacquenetta Slowgrave",
        time: "10 minutes",
        preview: "Thanks for the quick follow-up on the billing…",
        unread: 8,
        avatar: "https://i.pravatar.cc/128?img=32",
        lastMessageRole: "user",
    },
    {
        id: "2",
        conversationId: "2",
        name: "Nickola Peever",
        time: "Yesterday",
        preview: "Could you send the export one more time?",
        unread: 2,
        avatar: "https://i.pravatar.cc/128?img=12",
        lastMessageRole: "user",
    },
    {
        id: "3",
        conversationId: "3",
        name: "Morgan Aylett",
        time: "13 days",
        preview: "Sounds good, let’s schedule for next week.",
        unread: 0,
        avatar: "https://i.pravatar.cc/128?img=45",
        lastMessageRole: "user",
    },
    {
        id: "4",
        conversationId: "4",
        name: "Lauraine Dalby",
        time: "2 weeks",
        preview: "👍",
        unread: 0,
        avatar: "https://i.pravatar.cc/128?img=27",
        lastMessageRole: "admin",
    },
];

export const MOCK_IMAGE_MESSAGE_SRC =
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=640&h=480&fit=crop";
