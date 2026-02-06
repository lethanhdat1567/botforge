"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import dayjs from "dayjs";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart";

/* ================== TYPES ================== */

type AdminDashboardChartItem = {
    date: string;
    users: number;
    conversations: number;
    templates: number;
};

type ChartAreaProps = {
    data: AdminDashboardChartItem[];
};

/* ================== CONFIG ================== */

const chartConfig = {
    users: {
        label: "Người dùng",
        color: "var(--chart-1)",
    },
    conversations: {
        label: "Hội thoại",
        color: "var(--chart-2)",
    },
    templates: {
        label: "Template",
        color: "var(--chart-3)",
    },
} satisfies ChartConfig;

/* ================== COMPONENT ================== */

export function AdminDashboardAreaChart({ data }: ChartAreaProps) {
    const isEmpty = data.every(
        (item) =>
            item.users === 0 &&
            item.conversations === 0 &&
            item.templates === 0,
    );

    return (
        <Card>
            <CardHeader>
                <CardTitle>Tổng quan hệ thống</CardTitle>
                <CardDescription>
                    Người dùng, hội thoại và template theo thời gian
                </CardDescription>
            </CardHeader>

            <CardContent>
                {isEmpty ? (
                    <div className="text-muted-foreground flex h-65 items-center justify-center text-sm">
                        Không có dữ liệu trong khoảng thời gian này
                    </div>
                ) : (
                    <ChartContainer
                        config={chartConfig}
                        className="h-65 w-full"
                    >
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient
                                    id="fillUsers"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="5%"
                                        stopColor={chartConfig.users.color}
                                        stopOpacity={0.8}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor={chartConfig.users.color}
                                        stopOpacity={0.1}
                                    />
                                </linearGradient>

                                <linearGradient
                                    id="fillConversations"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="5%"
                                        stopColor={
                                            chartConfig.conversations.color
                                        }
                                        stopOpacity={0.8}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor={
                                            chartConfig.conversations.color
                                        }
                                        stopOpacity={0.1}
                                    />
                                </linearGradient>

                                <linearGradient
                                    id="fillTemplates"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="5%"
                                        stopColor={chartConfig.templates.color}
                                        stopOpacity={0.8}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor={chartConfig.templates.color}
                                        stopOpacity={0.1}
                                    />
                                </linearGradient>
                            </defs>

                            <CartesianGrid vertical={false} />

                            <XAxis
                                dataKey="date"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickFormatter={(value) =>
                                    dayjs(value).format("DD/MM")
                                }
                            />

                            <ChartTooltip
                                cursor={false}
                                content={
                                    <ChartTooltipContent indicator="dot" />
                                }
                            />

                            <Area
                                dataKey="users"
                                type="natural"
                                fill="url(#fillUsers)"
                                stroke="var(--color-users)"
                                stackId="a"
                            />

                            <Area
                                dataKey="conversations"
                                type="natural"
                                fill="url(#fillConversations)"
                                stroke="var(--color-conversations)"
                                stackId="a"
                            />

                            <Area
                                dataKey="templates"
                                type="natural"
                                fill="url(#fillTemplates)"
                                stroke="var(--color-templates)"
                                stackId="a"
                            />

                            <ChartLegend content={<ChartLegendContent />} />
                        </AreaChart>
                    </ChartContainer>
                )}
            </CardContent>
        </Card>
    );
}
