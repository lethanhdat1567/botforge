"use client"

import * as React from "react"
import { CalendarIcon, Download } from "lucide-react"
import { format } from "date-fns"
import { vi } from "date-fns/locale"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DashboardHeaderProps {
  date: DateRange | undefined;
  setDate: (date: DateRange | undefined) => void;
}

export function DashboardHeader({ date, setDate }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-stone-900">Bảng điều khiển</h1>
        <p className="text-xs text-stone-500 font-medium italic">Chào mừng bạn quay trở lại với BotForge</p>
      </div>
      <div className="flex items-center gap-2">
        <div className={cn("grid gap-2")}>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-[260px] justify-start text-left font-normal border-stone-200 bg-white hover:bg-stone-50 text-stone-900 shadow-sm transition-colors",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-stone-400" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "dd 'thg' L, y", { locale: vi })} -{" "}
                      {format(date.to, "dd 'thg' L, y", { locale: vi })}
                    </>
                  ) : (
                    format(date.from, "dd 'thg' L, y", { locale: vi })
                  )
                ) : (
                  <span>Chọn khoảng ngày</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
                locale={vi}
              />
            </PopoverContent>
          </Popover>
        </div>
        <Button 
            variant="default" 
            className="bg-black text-white hover:bg-stone-800 flex items-center gap-2 px-4 shadow-md transition-all active:scale-95"
        >
          <Download className="h-4 w-4" />
          Báo cáo
        </Button>
      </div>
    </div>
  )
}
