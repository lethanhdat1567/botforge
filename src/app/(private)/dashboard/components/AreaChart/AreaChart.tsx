"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

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
import dayjs from "dayjs";

const data = [
    { date: "2024-06-01", total: 120, completed: 80 },
    { date: "2024-06-02", total: 200, completed: 150 },
    { date: "2024-06-03", total: 180, completed: 110 },
    { date: "2024-06-04", total: 260, completed: 190 },
    { date: "2024-06-05", total: 320, completed: 260 },
    { date: "2024-06-06", total: 280, completed: 210 },
    { date: "2024-06-07", total: 350, completed: 300 },
];

const chartConfig = {
    total: {
        label: "Total conversations",
        color: "var(--chart-1)",
    },
    completed: {
        label: "Completed conversations",
        color: "var(--chart-2)",
    },
} satisfies ChartConfig;

type ChartAreaProps = {
    data: {
        date: string;
        total: number;
        completed: number;
    }[];
};

export function ChartArea({ data }: ChartAreaProps) {
    const isEmpty = data.every(
        (item) => item.total === 0 && item.completed === 0,
    );

    return (
        <Card>
            <CardHeader>
                <CardTitle>Hội thoại</CardTitle>
                <CardDescription>
                    Tổng số hội thoại vs hoàn thành
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
                                    id="fillTotal"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="5%"
                                        stopColor="var(--color-total)"
                                        stopOpacity={0.8}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="var(--color-total)"
                                        stopOpacity={0.1}
                                    />
                                </linearGradient>

                                <linearGradient
                                    id="fillCompleted"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="5%"
                                        stopColor="var(--color-completed)"
                                        stopOpacity={0.8}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="var(--color-completed)"
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
                                dataKey="completed"
                                type="natural"
                                fill="url(#fillCompleted)"
                                stroke="var(--color-completed)"
                                stackId="a"
                            />

                            <Area
                                dataKey="total"
                                type="natural"
                                fill="url(#fillTotal)"
                                stroke="var(--color-total)"
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
