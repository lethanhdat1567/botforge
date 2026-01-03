import {
    MessageCircle,
    Zap,
    Type,
    Folder,
    ImageIcon,
    Volume2,
    Video,
} from "lucide-react";

export const menuData = [
    {
        id: "message",
        category: "message",
        title: "Message Context",
        icon: MessageCircle,
        color: "#4988C4",
        children: [
            {
                id: "text",
                type: "text",
                title: "Text",
                icon: Type,
                color: "#4988C4",
            },
            {
                id: "image",
                type: "image",
                title: "Image",
                icon: ImageIcon, // ví dụ: Image, ImagePlus
                color: "#4F8EF7",
            },
            {
                id: "audio",
                type: "audio",
                title: "Audio",
                icon: Volume2, // lucide-react
                color: "#22C55E",
            },

            {
                id: "video",
                type: "video",
                title: "Video",
                icon: Video, // lucide-react
                color: "#A855F7",
            },

            {
                id: "quick_replies",
                type: "quick_replies",
                title: "Quick Replies",
                icon: Type,
                color: "#4988C4",
            },
            {
                id: "sender_actions",
                type: "sender_actions",
                title: "Sender Actions",
                icon: Type,
                color: "#4988C4",
            },
            {
                id: "welcome_screen",
                type: "welcome_screen",
                title: "Welcome Screen",
                icon: Type,
                color: "#4988C4",
            },
            {
                id: "persistent_menu",
                type: "persistent_menu",
                title: "Persistent Menu",
                icon: Type,
                color: "#4988C4",
            },
            {
                id: "generic_template",
                type: "generic_template",
                title: "Generic Template",
                icon: Type,
                color: "#4988C4",
            },
            {
                id: "coupon_template",
                type: "coupon_template",
                title: "Coupon Template",
                icon: Type,
                color: "#4988C4",
            },
            {
                id: "media_template",
                type: "media_template",
                title: "Media Template",
                icon: Type,
                color: "#4988C4",
            },
            {
                id: "receipt_template",
                type: "receipt_template",
                title: "Receipt Template",
                icon: Type,
                color: "#4988C4",
            },
        ],
    },
    {
        id: "action",
        category: "action",
        title: "Action",
        icon: Zap,
        color: "#FF0000",
        children: [
            {
                id: "delay",
                type: "delay",
                title: "Delay",
                icon: Zap,
                color: "#FF0000",
            },
            {
                id: "condition",
                type: "condition",
                title: "Condition",
                icon: Zap,
                color: "#FF0000",
            },
            {
                id: "set_variable",
                type: "set_variable",
                title: "Set Variable",
                icon: Zap,
                color: "#FF0000",
            },
            {
                id: "action-basic",
                type: "action-basic",
                title: "Action Basic",
                icon: Zap,
                color: "#FF0000",
            },
        ],
    },
    {
        id: "collection",
        category: "collection",
        title: "Collection",
        icon: Folder,
        color: "#00C853",
        children: [
            {
                id: "collection-basic",
                type: "collection-basic",
                title: "New Collection",
                icon: Folder,
                color: "#00C853",
            },
        ],
    },
];
