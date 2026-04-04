"use client";

import { useEffect, useState, useCallback } from "react";
import { ChartsSection } from "./_components/charts-section";
import {
    dashboardService,
    AdminDashboardStats,
} from "@/services/dashboardService";
import { toast } from "sonner";
import { DateRange } from "react-day-picker";
import { subDays } from "date-fns";
import { DashboardHeader } from "./_components/dashboard-header";
import { SummaryCards } from "./_components/summary-cards";

export default function AdminDashboardPage() {
    const [stats, setStats] = useState<AdminDashboardStats | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [date, setDate] = useState<DateRange | undefined>({
        from: subDays(new Date(), 7),
        to: new Date(),
    });

    const fetchStats = useCallback(async () => {
        if (!date?.from || !date?.to) return;

        setIsLoading(true);
        try {
            const data = await dashboardService.getAdminStats(
                date.from.toISOString(),
                date.to.toISOString(),
            );

            setStats(data);
        } catch (error) {
            console.error("Failed to fetch admin stats:", error);
            toast.error("Không thể tải dữ liệu quản trị");
        } finally {
            setIsLoading(false);
        }
    }, [date]);

    useEffect(() => {
        fetchStats();
    }, [fetchStats]);

    return (
        <div className="min-h-0 w-full min-w-0 flex-1 space-y-6 bg-neutral-50/30 pb-8 sm:space-y-8 sm:pb-10">
            <DashboardHeader date={date} setDate={setDate} />
            <div className="space-y-4">
                <SummaryCards data={stats?.summary} isLoading={isLoading} />
                <ChartsSection
                    chartData={stats?.chartData}
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
}
