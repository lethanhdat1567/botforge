import { TREND_STYLE } from "@/app/(private)/dashboard/components/TotalItem/data";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface TotalItemProps {
    title: string;
    value: string;
    change: string;
    icon: LucideIcon;
    trend: "up" | "down" | "neutral";
}

function TotalItem({
    title,
    value,
    change,
    icon: Icon,
    trend,
}: TotalItemProps) {
    return (
        <div className="flex flex-col gap-4 rounded-sm border bg-linear-to-t from-neutral-200/90 to-white p-4">
            <div className="flex items-start justify-between gap-8">
                <div>
                    <h2 className="mb-2 text-sm font-semibold">{title}</h2>
                    <p className="text-xs">
                        <span className={cn("font-medium", TREND_STYLE[trend])}>
                            {change}
                        </span>
                        <span className="text-muted-foreground">
                            {" "}
                            so với tháng trước
                        </span>
                    </p>
                </div>
                <Icon size={20} className="text-muted-foreground" />
            </div>

            <h3 className="text-3xl font-semibold">{value}</h3>
        </div>
    );
}

export default TotalItem;
