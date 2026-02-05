import { Book, Bot, MessageSquare, GitBranch } from "lucide-react";

export const DASHBOARD_STATS = [
    {
        id: "pages",
        title: "Trang đang hoạt động",
        value: "12 / 15",
        change: "+2 bot",
        trend: "up",
        icon: Bot,
    },
    {
        id: "conversations",
        title: "Hội thoại",
        value: "3.248",
        change: "+18.2%",
        trend: "up",
        icon: MessageSquare,
    },
    {
        id: "flow-trigger",
        title: "Tỷ lệ kích hoạt Flow",
        value: "74%",
        change: "-6.1%",
        trend: "down",
        icon: GitBranch,
    },
    {
        id: "templates",
        title: "Template chia sẻ",
        value: "5",
        change: "+1 tuần này",
        trend: "up",
        icon: Book,
    },
] as const;

export const TREND_STYLE = {
    up: "text-emerald-600",
    down: "text-red-600",
    neutral: "text-muted-foreground",
} as const;
