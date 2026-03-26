"use client"

import { ArrowUpRight, ArrowDownRight, Workflow, Database, Share2, Activity } from "lucide-react"
import { motion } from "motion/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

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
      change: "+0%",
      isPositive: true,
      icon: Workflow,
    },
    {
      title: "Bản ghi dữ liệu",
      value: data?.recordsCount ?? 0,
      change: "+0%",
      isPositive: true,
      icon: Database,
    },
    {
      title: "Flow đã chia sẻ",
      value: data?.sharesCount ?? 0,
      change: "+0%",
      isPositive: true,
      icon: Share2,
    },
    {
      title: "Lượt thực thi",
      value: data?.executionsCount ?? 0,
      change: "+0%",
      isPositive: true,
      icon: Activity,
    },
  ]

  const formatValue = (val: number) => {
    if (val >= 1000000) return (val / 1000000).toFixed(1) + "M";
    if (val >= 1000) return (val / 1000).toFixed(1) + "K";
    return val.toString();
  }

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <MetricCard 
          key={metric.title}
          index={index}
          title={metric.title}
          value={isLoading ? "..." : formatValue(metric.value as number)}
          change={metric.change}
          isPositive={metric.isPositive}
          icon={metric.icon}
        />
      ))}
    </div>
  )
}

function MetricCard({ 
  index, 
  title, 
  value, 
  change, 
  isPositive,
  icon: Icon
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
      <Card className="border-stone-200 bg-white shadow-sm transition-all hover:shadow-md hover:border-stone-400 group relative overflow-hidden py-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-2">
          <CardTitle className="text-xs font-bold uppercase tracking-widest text-stone-600">
            {title}
          </CardTitle>
          <div className="p-1.5 rounded-md bg-stone-50 border border-stone-100 group-hover:bg-stone-100 transition-colors">
            <Icon className="h-3.5 w-3.5 text-stone-900" />
          </div>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <div className="flex items-baseline justify-between align-bottom">
            <div className="text-3xl font-bold tracking-tight text-stone-900 tabular-nums">
              {value}
            </div>
            <div className={cn(
              "flex items-center text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-stone-100",
              isPositive ? "text-emerald-700 bg-emerald-50" : "text-red-700 bg-red-50"
            )}>
              {change}
              {isPositive ? <ArrowUpRight className="ml-0.5 h-2.5 w-2.5" /> : <ArrowDownRight className="ml-0.5 h-2.5 w-2.5" />}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
