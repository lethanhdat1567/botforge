import {
    Bot,
    MessageSquare,
    CheckCheck,
    LayoutPanelLeft,
    Users,
    LayoutTemplate,
    Share2,
    MessagesSquare,
} from "lucide-react";

export function mapDashboardOverview(overview: any) {
    return [
        {
            id: "users",
            title: "Tổng người dùng",
            value: `${overview.users.value}`,
            change: formatCompare(overview.users.comparePercent),
            trend: getTrend(overview.users.comparePercent),
            icon: Users,
        },
        {
            id: "bots",
            title: "Số lượng chat bot",
            value: formatNumber(overview.bots.value),
            change: formatCompare(overview.bots.comparePercent),
            trend: getTrend(overview.bots.comparePercent),
            icon: LayoutTemplate,
        },
        {
            id: "sharedTemplates",
            title: "Mẫu cộng đồng",
            value: `${overview.sharedTemplates.value}`,
            change: formatCompare(overview.sharedTemplates.comparePercent),
            trend: getTrend(overview.sharedTemplates.comparePercent),
            icon: Share2,
        },
        {
            id: "conversations",
            title: "Tổng hội thoại",
            value: `${overview.conversations.value}`,
            change: formatCompare(overview.conversations.comparePercent),
            trend: getTrend(overview.conversations.comparePercent),
            icon: MessagesSquare,
        },
    ];
}

function getTrend(percent?: number) {
    if (percent === undefined) return "neutral";
    if (percent > 0) return "up";
    if (percent < 0) return "down";
    return "neutral";
}

function formatCompare(percent?: number) {
    if (percent === undefined) return "—";
    if (percent === 0) return "0%";
    return percent > 0 ? `+${percent}%` : `${percent}%`;
}

function formatNumber(value: number) {
    return new Intl.NumberFormat("vi-VN").format(value);
}

// helpers/admin-dashboard-chart.ts
export type AdminDashboardChartItem = {
    date: string;
    users: number;
    conversations: number;
    templates: number;
};

export function mapAdminDashboardChart(data: any): AdminDashboardChartItem[] {
    const series = data?.series;
    if (!Array.isArray(series)) return [];

    return series.map((item: any) => ({
        date: item.date,
        users: Number(item.users) || 0,
        conversations: Number(item.conversations) || 0,
        templates: Number(item.templates) || 0,
    }));
}
