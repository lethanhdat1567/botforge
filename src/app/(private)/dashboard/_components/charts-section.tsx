"use client";

import {
    CartesianGrid,
    Line,
    Area,
    AreaChart,
    XAxis,
    YAxis,
    ResponsiveContainer,
    LineChart,
} from "recharts";
import { Share, TrendingUp, CalendarDays, Activity } from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { Button } from "@/components/ui/button";

interface ChartsSectionProps {
    chartData?: Array<{ day: string; executions: number }>;
    summary?: {
        executionsCount: number;
        [key: string]: any;
    };
    isLoading?: boolean;
}

const chartConfig = {
    executions: {
        label: "Lượt chạy",
        color: "var(--foreground)",
    },
    users: {
        label: "Người dùng",
        color: "var(--muted-foreground)",
    },
} satisfies ChartConfig;

export function ChartsSection({
    chartData,
    summary,
    isLoading,
}: ChartsSectionProps) {
    const formatValue = (val: number) => {
        if (val >= 1000000) return (val / 1000000).toFixed(1) + "M";
        if (val >= 1000) return (val / 1000).toFixed(1) + "K";
        return val.toLocaleString();
    };

    return (
        <div className="w-full min-w-0 pb-8">
            <Card className="border-border bg-card group relative flex w-full min-w-0 flex-col overflow-hidden py-0 shadow-xl">
                {/* Subtle decorative background */}
                <div className="pointer-events-none absolute top-0 right-0 p-8 opacity-[0.03] transition-opacity group-hover:opacity-[0.06]">
                    <TrendingUp className="text-foreground h-48 w-48" />
                </div>

                <CardHeader className="border-border relative z-10 flex flex-col gap-4 border-b p-6 pb-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1 text-left">
                        <div className="text-muted-foreground flex items-center gap-2">
                            <CalendarDays className="h-3.5 w-3.5" />
                            <span className="text-[10px] font-bold tracking-widest uppercase">
                                Dữ liệu thời gian thực
                            </span>
                        </div>
                        <CardTitle className="text-foreground text-xl font-bold tracking-tight">
                            Thống kê hoạt động Flows
                        </CardTitle>
                        <CardDescription className="text-muted-foreground text-xs font-medium">
                            Lượt thực thi và tương tác người dùng trong 30 ngày
                            qua
                        </CardDescription>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="mr-4 hidden flex-col items-end lg:flex">
                            <span className="text-muted-foreground text-[10px] font-bold tracking-tighter uppercase">
                                Tổng lượt chạy
                            </span>
                            <span className="text-foreground text-2xl leading-none font-bold tabular-nums">
                                {isLoading
                                    ? "..."
                                    : formatValue(
                                          summary?.executionsCount ?? 0,
                                      )}
                            </span>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="relative z-10 flex-1 px-4 pt-6 pb-4">
                    <ChartContainer
                        config={chartConfig}
                        className="h-60 w-full"
                    >
                        <LineChart
                            data={chartData ?? []}
                            margin={{ left: 12, right: 30, top: 10, bottom: 0 }}
                        >
                            <CartesianGrid
                                vertical={false}
                                strokeDasharray="4 4"
                                stroke="var(--border)"
                            />
                            <XAxis
                                dataKey="day"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={15}
                                className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase"
                            />
                            <YAxis hide domain={["dataMin", "dataMax + 10"]} />
                            <ChartTooltip
                                cursor={{
                                    stroke: "var(--border)",
                                    strokeWidth: 1,
                                }}
                                content={
                                    <ChartTooltipContent
                                        indicator="line"
                                        className="border-border bg-popover text-popover-foreground shadow-xl"
                                    />
                                }
                            />
                            <Line
                                type="monotone"
                                dataKey="executions"
                                stroke="var(--color-executions)"
                                strokeWidth={3}
                                dot={{
                                    r: 4,
                                    strokeWidth: 2,
                                    fill: "var(--background)",
                                }}
                                activeDot={{
                                    r: 6,
                                    strokeWidth: 0,
                                    fill: "var(--color-executions)",
                                }}
                                animationDuration={1500}
                            />
                            {/* Note: User metric is removed as it's not currently provided by the API summary */}
                        </LineChart>
                    </ChartContainer>

                    <div className="border-border mt-6 flex flex-wrap items-center justify-between gap-3 border-t px-2 pt-4">
                        <div className="flex flex-wrap gap-4 sm:gap-6">
                            <div className="flex items-center gap-2">
                                <div className="bg-foreground h-2 w-2 rounded-full" />
                                <span className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">
                                    Lượt chạy
                                </span>
                            </div>
                            {/* Secondary legend item hidden if no data */}
                        </div>
                        <div className="flex cursor-default items-center gap-1 rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold text-emerald-800 shadow-sm transition-all hover:bg-emerald-500/15 dark:border-emerald-500/30 dark:bg-emerald-500/15 dark:text-emerald-400">
                            <TrendingUp className="h-3 w-3" />
                            <span>Hoạt động ổn định</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
