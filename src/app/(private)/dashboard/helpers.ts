import { Bot, MessageSquare, CheckCheck, LayoutPanelLeft } from "lucide-react";

export function mapDashboardOverview(overview: any) {
    return [
        {
            id: "pages",
            title: "Trang đang hoạt động",
            value: `${overview.pages.active}`,
            change: formatCompare(overview.pages.comparePercent),
            trend: getTrend(overview.pages.comparePercent),
            icon: Bot,
        },
        {
            id: "conversations",
            title: "Hội thoại",
            value: formatNumber(overview.conversations.value),
            change: formatCompare(overview.conversations.comparePercent),
            trend: getTrend(overview.conversations.comparePercent),
            icon: MessageSquare,
        },
        {
            id: "flow-trigger",
            title: "Tỷ lệ Flow thành công",
            value: `${overview.flowTriggerRate.value}`,
            change: formatCompare(overview.flowTriggerRate.comparePercent),
            trend: getTrend(overview.flowTriggerRate.comparePercent),
            icon: CheckCheck,
        },
        {
            id: "templates",
            title: "Template chia sẻ",
            value: `${overview.sharedTemplates.value}`,
            change: formatCompare(overview.sharedTemplates.comparePercent),
            trend: getTrend(overview.sharedTemplates.comparePercent),
            icon: LayoutPanelLeft,
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

export function mapConversationChart(data: any) {
    if (!data?.series) return [];

    return data.series.map((item: any) => ({
        date: item.date,
        total: item.total,
        completed: item.completed,
    }));
}
