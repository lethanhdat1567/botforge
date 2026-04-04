"use client";

import * as React from "react";
import { CalendarIcon, Download } from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

interface DashboardHeaderProps {
    date: DateRange | undefined;
    setDate: (date: DateRange | undefined) => void;
}

export function DashboardHeader({ date, setDate }: DashboardHeaderProps) {
    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
                <h1 className="text-2xl font-bold tracking-tight text-stone-900">
                    Quản trị hệ thống
                </h1>
                <p className="text-xs font-medium text-stone-500 italic">
                    Tổng quan hoạt động của toàn bộ nền tảng BotForge
                </p>
            </div>
            <div className="flex w-full items-center gap-2 md:w-auto md:shrink-0">
                <div className={cn("grid w-full gap-2 md:w-auto")}>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                id="date"
                                variant={"outline"}
                                className={cn(
                                    "w-full max-w-[260px] justify-start border-stone-200 bg-white text-left font-normal text-stone-900 shadow-sm transition-colors hover:bg-stone-50",
                                    !date && "text-muted-foreground",
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4 text-stone-400" />
                                {date?.from ? (
                                    date.to ? (
                                        <>
                                            {format(
                                                date.from,
                                                "dd 'thg' L, y",
                                                { locale: vi },
                                            )}{" "}
                                            -{" "}
                                            {format(date.to, "dd 'thg' L, y", {
                                                locale: vi,
                                            })}
                                        </>
                                    ) : (
                                        format(date.from, "dd 'thg' L, y", {
                                            locale: vi,
                                        })
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
            </div>
        </div>
    );
}
