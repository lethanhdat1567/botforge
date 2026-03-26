// components/shared-flow/status-badge.tsx
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
    status: string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
    const isActive = status === "active";

    return (
        <Badge
            variant="outline"
            className={cn(
                "rounded-none border px-3 py-1 text-[10px] font-medium tracking-tight uppercase",
                isActive
                    ? "border-emerald-700 bg-emerald-50 text-emerald-700"
                    : "border-slate-700 bg-slate-50 text-slate-500",
            )}
        >
            {isActive ? "Hoạt động" : "Tạm dừng"}
        </Badge>
    );
}
