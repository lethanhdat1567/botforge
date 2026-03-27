"use client";

import { useEffect, useState, useCallback } from "react";
import { DashboardHeader } from "./_components/dashboard-header";
import { SummaryCards } from "./_components/summary-cards";
import { ChartsSection } from "./_components/charts-section";
import { dashboardService, DashboardStats } from "@/services/dashboardService";
import { toast } from "sonner";
import { DateRange } from "react-day-picker";
import { subDays } from "date-fns";

export default function DashboardPage() {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [date, setDate] = useState<DateRange | undefined>({
        from: subDays(new Date(), 30),
        to: new Date(),
    });

    const fetchStats = useCallback(async () => {
        if (!date?.from || !date?.to) return;

        setIsLoading(true);
        try {
            const data = await dashboardService.getUserStats(
                date.from.toISOString(),
                date.to.toISOString(),
            );

            setStats(data);
        } catch (error) {
            console.error("Failed to fetch dashboard stats:", error);
            toast.error("Không thể tải dữ liệu dashboard");
        } finally {
            setIsLoading(false);
        }
    }, [date]);

    useEffect(() => {
        fetchStats();
    }, [fetchStats]);

    return (
        <div className="min-h-screen flex-1 space-y-8 bg-neutral-50/30 pb-10">
            <DashboardHeader date={date} setDate={setDate} />
            <div className="space-y-4">
                <SummaryCards data={stats?.summary} isLoading={isLoading} />
                <ChartsSection
                    chartData={stats?.chartData}
                    summary={stats?.summary}
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
}
