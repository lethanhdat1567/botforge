"use client";

import {
    ArrowUpRight,
    ArrowDownRight,
    Users,
    Share2,
    FileText,
    Activity,
} from "lucide-react";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SummaryCardsProps {
    data?: {
        usersCount: number;
        sharedFlowsCount: number;
        postsCount: number;
    };
    isLoading?: boolean;
}

export function SummaryCards({ data, isLoading }: SummaryCardsProps) {
    const metrics = [
        {
            title: "Người dùng",
            value: data?.usersCount ?? 0,
            change: "+0%",
            isPositive: true,
            icon: Users,
        },
        {
            title: "Flow chia sẻ",
            value: data?.sharedFlowsCount ?? 0,
            change: "+0%",
            isPositive: true,
            icon: Share2,
        },
        {
            title: "Tổng bài viết",
            value: data?.postsCount ?? 0,
            change: "+0%",
            isPositive: true,
            icon: FileText,
        },
    ];

    const formatValue = (val: number) => {
        if (val >= 1000000) return (val / 1000000).toFixed(1) + "M";
        if (val >= 1000) return (val / 1000).toFixed(1) + "K";
        return val.toString();
    };

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {metrics.map((metric, index) => (
                <MetricCard
                    key={metric.title}
                    index={index}
                    title={metric.title}
                    value={
                        isLoading ? "..." : formatValue(metric.value as number)
                    }
                    change={metric.change}
                    isPositive={metric.isPositive}
                    icon={metric.icon}
                />
            ))}
        </div>
    );
}

function MetricCard({
    index,
    title,
    value,
    change,
    isPositive,
    icon: Icon,
}: {
    index: number;
    title: string;
    value: string;
    change: string;
    isPositive: boolean;
    icon: any;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05, ease: "easeOut" }}
            className="group"
        >
            <Card className="group relative overflow-hidden border-stone-200 bg-white py-0 shadow-sm transition-all hover:border-stone-400 hover:shadow-md">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-2">
                    <CardTitle className="text-xs font-bold tracking-widest text-stone-600 uppercase">
                        {title}
                    </CardTitle>
                    <div className="rounded-md border border-stone-100 bg-stone-50 p-1.5 transition-colors group-hover:bg-stone-100">
                        <Icon className="h-3.5 w-3.5 text-stone-900" />
                    </div>
                </CardHeader>
                <CardContent className="px-4 pb-4">
                    <div className="flex items-baseline justify-between align-bottom">
                        <div className="text-3xl font-bold tracking-tight text-stone-900 tabular-nums">
                            {value}
                        </div>
                        <div
                            className={cn(
                                "flex items-center rounded-full border border-stone-100 px-1.5 py-0.5 text-[10px] font-bold",
                                isPositive
                                    ? "bg-emerald-50 text-emerald-700"
                                    : "bg-red-50 text-red-700",
                            )}
                        >
                            {change}
                            {isPositive ? (
                                <ArrowUpRight className="ml-0.5 h-2.5 w-2.5" />
                            ) : (
                                <ArrowDownRight className="ml-0.5 h-2.5 w-2.5" />
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
