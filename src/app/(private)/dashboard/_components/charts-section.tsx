"use client"

import { CartesianGrid, Line, Area, AreaChart, XAxis, YAxis, ResponsiveContainer, LineChart } from "recharts"
import { Share, TrendingUp, CalendarDays, Activity } from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Button } from "@/components/ui/button"

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
} satisfies ChartConfig

export function ChartsSection({ chartData, summary, isLoading }: ChartsSectionProps) {
  const formatValue = (val: number) => {
    if (val >= 1000000) return (val / 1000000).toFixed(1) + "M";
    if (val >= 1000) return (val / 1000).toFixed(1) + "K";
    return val.toLocaleString();
  }

  return (
    <div className="w-full pb-8">
      <Card className="border-stone-200 shadow-xl flex flex-col w-full bg-white relative overflow-hidden group py-0">
        {/* Subtle decorative background */}
        <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity pointer-events-none">
          <TrendingUp className="h-48 w-48 text-stone-900" />
        </div>
        
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-stone-100/60 p-6 relative z-10">
          <div className="space-y-1 text-left">
            <div className="flex items-center gap-2 text-stone-400">
               <CalendarDays className="h-3.5 w-3.5" />
               <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Dữ liệu thời gian thực</span>
            </div>
            <CardTitle className="text-xl font-bold tracking-tight text-stone-900">Thống kê hoạt động Flows</CardTitle>
            <CardDescription className="text-xs text-stone-500 font-medium">Lượt thực thi và tương tác người dùng trong 30 ngày qua</CardDescription>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex flex-col items-end mr-4">
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-tighter">Tổng lượt chạy</span>
                <span className="text-2xl font-bold text-stone-900 tabular-nums leading-none">
                  {isLoading ? "..." : formatValue(summary?.executionsCount ?? 0)}
                </span>
            </div>
            <Button variant="outline" size="sm" className="h-9 px-4 border-stone-200 text-stone-600 hover:bg-stone-50 hover:text-stone-900 font-bold text-[11px] uppercase tracking-widest transition-all shadow-sm active:scale-95">
              <Share className="mr-2 h-3.5 w-3.5" />
              Xuất báo cáo
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 pt-6 pb-4 px-4 relative z-10">
          <ChartContainer config={chartConfig} className="h-60 w-full">
            <LineChart data={chartData ?? []} margin={{ left: 12, right: 30, top: 10, bottom: 0 }}>
              <CartesianGrid vertical={false} strokeDasharray="4 4" stroke="#f0f0f0" />
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tickMargin={15}
                className="text-stone-400 font-bold text-[10px] uppercase tracking-widest"
              />
              <YAxis 
                hide 
                domain={['dataMin', 'dataMax + 10']}
              />
              <ChartTooltip
                cursor={{ stroke: "#e5e7eb", strokeWidth: 1 }}
                content={<ChartTooltipContent indicator="line" className="bg-white border-stone-200 shadow-xl" />}
              />
              <Line
                type="monotone"
                dataKey="executions"
                stroke="var(--color-executions)"
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 2, fill: "white" }}
                activeDot={{ r: 6, strokeWidth: 0, fill: "var(--color-executions)" }}
                animationDuration={1500}
              />
              {/* Note: User metric is removed as it's not currently provided by the API summary */}
            </LineChart>
          </ChartContainer>
          
          <div className="mt-6 flex items-center justify-between px-2 pt-4 border-t border-stone-100/60">
            <div className="flex gap-6">
                <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-stone-900" />
                    <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Lượt chạy</span>
                </div>
                {/* Secondary legend item hidden if no data */}
            </div>
            <div className="flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-md text-[10px] font-bold transition-all hover:bg-emerald-100 cursor-default shadow-sm border border-emerald-100/50">
                <TrendingUp className="h-3 w-3" />
                <span>Hoạt động ổn định</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
