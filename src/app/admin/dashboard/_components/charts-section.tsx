"use client"

import { CartesianGrid, Line, XAxis, YAxis, LineChart } from "recharts"
import { Share, TrendingUp, CalendarDays } from "lucide-react"

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
  chartData?: Array<{ 
    day: string; 
    users: number; 
    sharedFlows: number; 
    posts: number;
  }>;
  isLoading?: boolean;
}

const chartConfig = {
  users: {
    label: "Người dùng mới",
    color: "#0f172a", // Slate 900
  },
  sharedFlows: {
    label: "Flow chia sẻ",
    color: "#059669", // Emerald 600
  },
  posts: {
    label: "Bài viết mới",
    color: "#2563eb", // Blue 600
  },
} satisfies ChartConfig

export function ChartsSection({ chartData, isLoading }: ChartsSectionProps) {
  const formatValue = (val: number) => {
    if (val >= 1000000) return (val / 1000000).toFixed(1) + "M";
    if (val >= 1000) return (val / 1000).toFixed(1) + "K";
    return val.toLocaleString();
  }

  return (
    <div className="w-full min-w-0 pb-8">
      <Card className="border-stone-200 shadow-xl flex flex-col w-full min-w-0 bg-white relative overflow-hidden group py-0">
        <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity pointer-events-none">
          <TrendingUp className="h-48 w-48 text-stone-900" />
        </div>
        
        <CardHeader className="flex flex-col gap-4 border-b border-stone-100/60 p-4 pb-4 relative z-10 sm:p-6 sm:pb-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1 text-left">
            <div className="flex items-center gap-2 text-stone-400">
               <CalendarDays className="h-3.5 w-3.5" />
               <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Dữ liệu thời gian thực</span>
            </div>
            <CardTitle className="text-xl font-bold tracking-tight text-stone-900">Biểu đồ tăng trưởng</CardTitle>
            <CardDescription className="text-xs text-stone-500 font-medium">Thống kê người dùng, flows và bài viết mới</CardDescription>
          </div>
          
          <div className="flex w-full flex-wrap items-center gap-2 md:w-auto md:justify-end">
            <Button variant="outline" size="sm" className="h-9 w-full border-stone-200 px-4 text-[11px] font-bold tracking-widest text-stone-600 uppercase shadow-sm transition-all hover:bg-stone-50 hover:text-stone-900 active:scale-95 sm:w-auto">
              <Share className="mr-2 h-3.5 w-3.5" />
              Xuất báo cáo
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 pt-6 pb-4 px-4 relative z-10">
          <ChartContainer config={chartConfig} className="h-64 w-full">
            <LineChart data={chartData ?? []} margin={{ left: 12, right: 30, top: 10, bottom: 0 }}>
              <CartesianGrid vertical={false} strokeDasharray="4 4" stroke="#f0f0f0" />
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tickMargin={15}
                className="text-stone-400 font-bold text-[10px] uppercase tracking-widest"
              />
              <YAxis hide domain={['dataMin', 'dataMax + 5']} />
              <ChartTooltip
                cursor={{ stroke: "#e5e7eb", strokeWidth: 1 }}
                content={<ChartTooltipContent indicator="line" className="bg-white border-stone-200 shadow-xl" />}
              />
              <Line
                type="monotone"
                dataKey="users"
                stroke="var(--color-users)"
                strokeWidth={2}
                dot={{ r: 3, strokeWidth: 2, fill: "white" }}
                activeDot={{ r: 5, strokeWidth: 0, fill: "var(--color-users)" }}
                animationDuration={1000}
              />
              <Line
                type="monotone"
                dataKey="sharedFlows"
                stroke="var(--color-sharedFlows)"
                strokeWidth={2}
                dot={{ r: 3, strokeWidth: 2, fill: "white" }}
                activeDot={{ r: 5, strokeWidth: 0, fill: "var(--color-sharedFlows)" }}
                animationDuration={1200}
              />
              <Line
                type="monotone"
                dataKey="posts"
                stroke="var(--color-posts)"
                strokeWidth={2}
                dot={{ r: 3, strokeWidth: 2, fill: "white" }}
                activeDot={{ r: 5, strokeWidth: 0, fill: "var(--color-posts)" }}
                animationDuration={1400}
              />
            </LineChart>
          </ChartContainer>
          
          <div className="mt-6 flex flex-wrap gap-6 px-2 pt-4 border-t border-stone-100/60">
            <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-slate-900" />
                <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Người dùng</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-600" />
                <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Flow chia sẻ</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-blue-600" />
                <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Bài viết</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
