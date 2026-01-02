import { MessageCircle, Zap, Type, Folder } from "lucide-react";

export const menuData = [
    {
        id: "message",
        title: "Message Context",
        icon: MessageCircle,
        color: "#4988C4",
        children: [
            {
                id: "text",
                title: "Text",
                icon: Type,
                color: "#4988C4",
            },
        ],
    },
    {
        id: "action",
        title: "Action",
        icon: Zap,
        color: "#FF0000",
        children: [
            {
                id: "action-basic",
                title: "Action",
                icon: Zap,
                color: "#FF0000",
            },
        ],
    },
    {
        id: "collection",
        title: "Collection",
        icon: Folder,
        color: "#00C853", // màu xanh lá
        children: [
            {
                id: "collection-basic",
                title: "New Collection",
                icon: Folder,
                color: "#00C853",
            },
        ],
    },
];
