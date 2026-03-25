"use client";

import { Button } from "@/components/ui/button";
import { SlidersHorizontal, Check } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const SORT_OPTIONS = [
    { label: "Phổ biến nhất", sortBy: "downloads", sortOrder: "desc" },
    { label: "Yêu thích nhất", sortBy: "likes", sortOrder: "desc" },
    { label: "Gần đây", sortBy: "createdAt", sortOrder: "desc" },
    { label: "Trước đây", sortBy: "createdAt", sortOrder: "asc" },
];

type Props = {
    sortBy: string;
    sortOrder: string;
    onSort: (sortBy: string, sortOrder: string) => void;
};

function FilterBtn({ sortBy, sortOrder, onSort }: Props) {
    const activeOption = SORT_OPTIONS.find(
        (opt) => opt.sortBy === sortBy && opt.sortOrder === sortOrder,
    );

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    className="border-muted-foreground/20 flex w-full items-center gap-2"
                >
                    <SlidersHorizontal className="h-4 w-4" />
                    <span className="text-sm font-medium">
                        {activeOption?.label || "Bộ lọc sản phẩm"}
                    </span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48" align="end">
                <DropdownMenuGroup>
                    {SORT_OPTIONS.map((option) => {
                        const isSelected =
                            sortBy === option.sortBy &&
                            sortOrder === option.sortOrder;
                        return (
                            <DropdownMenuItem
                                key={`${option.sortBy}-${option.sortOrder}`}
                                onClick={() =>
                                    onSort(option.sortBy, option.sortOrder)
                                }
                                className={cn(
                                    "flex cursor-pointer items-center justify-between",
                                    isSelected && "bg-secondary font-medium",
                                )}
                            >
                                {option.label}
                                {isSelected && <Check className="h-4 w-4" />}
                            </DropdownMenuItem>
                        );
                    })}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default FilterBtn;
