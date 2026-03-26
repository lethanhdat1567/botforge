// components/DataTable/components/DataTableColumnHeader.tsx
import { Column } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface DataTableColumnHeaderProps<
    TData,
    TValue,
> extends React.HTMLAttributes<HTMLDivElement> {
    column: Column<TData, TValue>;
    title: string;
}

export function DataTableColumnHeader<TData, TValue>({
    column,
    title,
    className,
}: DataTableColumnHeaderProps<TData, TValue>) {
    if (!column.getCanSort()) {
        return (
            <div
                className={cn(
                    "text-[11px] font-bold tracking-wider uppercase",
                    className,
                )}
            >
                {title}
            </div>
        );
    }

    return (
        <div className={cn("flex items-center space-x-2", className)}>
            <Button
                variant="ghost"
                size="sm"
                className="data-[state=open]:bg-accent -ml-3 h-8 p-1 px-2 text-[11px] font-bold tracking-wider uppercase hover:bg-transparent"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
            >
                <span>{title}</span>
                {column.getIsSorted() === "desc" ? (
                    <ArrowDown className="ml-2 h-3 w-3" />
                ) : column.getIsSorted() === "asc" ? (
                    <ArrowUp className="ml-2 h-3 w-3" />
                ) : (
                    <ChevronsUpDown className="text-muted-foreground/50 ml-2 h-3 w-3" />
                )}
            </Button>
        </div>
    );
}
