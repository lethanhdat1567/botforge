"use client";

import { DatePickerWithRange } from "@/app/(private)/dashboard/components/DatePicker/DatePicker";
import TotalItem from "@/app/(private)/dashboard/components/TotalItem/TotalItem";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import dayjs from "dayjs";
import { adminDashboardService } from "@/services/adminDashboardService";
import {
    mapAdminDashboardChart,
    mapDashboardOverview,
} from "@/app/admin/dashboard/helpers";
import { AdminDashboardAreaChart } from "@/app/admin/dashboard/AdminAreaChart";

function AdmimDashboardPage() {
    const [overview, setOverview] = useState<any>([]);
    const [chartData, setChartData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const [range, setRange] = useState<DateRange>({
        from: dayjs().startOf("month").toDate(),
        to: dayjs().endOf("day").toDate(),
    });

    const fetchDashboard = async (range: DateRange) => {
        if (!range.from || !range.to) return;

        try {
            setLoading(true);
            const [overviewRes, chartRes] = await Promise.all([
                adminDashboardService.overview({
                    from: range.from,
                    to: range.to,
                }),
                adminDashboardService.chart({
                    from: range.from,
                    to: range.to,
                }),
            ]);

            setOverview(mapDashboardOverview(overviewRes.data.data));
            setChartData(mapAdminDashboardChart(chartRes.data.data));
        } catch (error) {
            console.error("Fetch dashboard failed:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboard(range);
    }, [range]);

    return (
        <div>
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold">Tổng quan</h1>
                {/* Date picker */}
                <DatePickerWithRange
                    initDate={range}
                    onSelect={(r) => {
                        if (!r?.from || !r?.to) return;
                        setRange(r);
                    }}
                />
            </div>
            <div className="mt-4 space-y-4">
                {/* Blocks section  */}
                <div className="grid grid-cols-4 gap-2">
                    {overview.map((item: any) => (
                        <TotalItem
                            key={item.id}
                            title={item.title}
                            value={item.value}
                            change={item.change}
                            trend={item.trend}
                            icon={item.icon}
                        />
                    ))}
                </div>
                {/* Chart section */}
                <AdminDashboardAreaChart data={chartData} />
            </div>
        </div>
    );
}

export default AdmimDashboardPage;
