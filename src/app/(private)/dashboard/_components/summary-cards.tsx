"use client";

import { Workflow, Database, Share2, Activity } from "lucide-react";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SummaryCardsProps {
    data?: {
        flowsCount: number;
        recordsCount: number;
        sharesCount: number;
        executionsCount: number;
    };
    isLoading?: boolean;
}

export function SummaryCards({ data, isLoading }: SummaryCardsProps) {
    const metrics = [
        {
            title: "Flow đã tạo",
            value: data?.flowsCount ?? 0,
            isPositive: true,
            icon: Workflow,
        },
        {
            title: "Thống kê dữ liệu",
            value: data?.recordsCount ?? 0,

            isPositive: true,
            icon: Database,
        },
        {
            title: "Flow đã chia sẻ",
            value: data?.sharesCount ?? 0,

            isPositive: true,
            icon: Share2,
        },
        {
            title: "Lượt nhắn tin",
            value: data?.executionsCount ?? 0,

            isPositive: true,
            icon: Activity,
        },
    ];

    const formatValue = (val: number) => {
        if (val >= 1000000) return (val / 1000000).toFixed(1) + "M";
        if (val >= 1000) return (val / 1000).toFixed(1) + "K";
        return val.toString();
    };

    return (
        <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric, index) => (
                <MetricCard
                    key={metric.title}
                    index={index}
                    title={metric.title}
                    value={
                        isLoading ? "..." : formatValue(metric.value as number)
                    }
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
    icon: Icon,
}: {
    index: number;
    title: string;
    value: string;
    icon: any;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05, ease: "easeOut" }}
            className="group"
        >
            <Card className="border-border bg-card group hover:border-border relative overflow-hidden py-0 shadow-sm transition-all hover:shadow-md">
                <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 p-4 pb-2">
                    <CardTitle className="text-muted-foreground min-w-0 truncate text-xs font-bold tracking-widest uppercase">
                        {title}
                    </CardTitle>
                    <div className="border-border bg-muted group-hover:bg-muted/80 rounded-md border p-1.5 transition-colors">
                        <Icon className="text-foreground h-3.5 w-3.5" />
                    </div>
                </CardHeader>
                <CardContent className="px-4 pb-4">
                    <div className="flex items-baseline justify-between align-bottom">
                        <div className="text-foreground text-3xl font-bold tracking-tight tabular-nums">
                            {value}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
