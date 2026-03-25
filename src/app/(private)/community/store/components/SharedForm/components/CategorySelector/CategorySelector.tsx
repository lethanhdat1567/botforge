"use client";

import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface Category {
    id: string;
    name: string;
}

interface CategorySelectorProps {
    categories: Category[];
    selected: string[];
    onChange: (selected: string[]) => void;
}

export function CategorySelector({
    categories,
    selected,
    onChange,
}: CategorySelectorProps) {
    const [open, setOpen] = React.useState(false);

    const handleUnselect = (id: string) => {
        onChange(selected.filter((s) => s !== id));
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            {/* Chuyển asChild sang div để tránh lỗi button lồng button */}
            <PopoverTrigger asChild>
                <div
                    role="combobox"
                    aria-expanded={open}
                    className={cn(
                        "border-input bg-background ring-offset-background flex min-h-[40px] w-full cursor-pointer items-center justify-between rounded-md border px-3 py-2 text-sm",
                        "focus-within:ring-ring focus-within:ring-2 focus-within:ring-offset-2",
                        selected.length > 0 ? "h-auto" : "h-10",
                    )}
                    onClick={() => setOpen(!open)}
                >
                    <div className="flex flex-wrap gap-1">
                        {selected.length > 0 ? (
                            categories
                                .filter((cat) => selected.includes(cat.id))
                                .map((cat) => (
                                    <Badge
                                        variant="secondary"
                                        key={cat.id}
                                        className="flex items-center gap-1"
                                    >
                                        {cat.name}
                                        <span
                                            role="button"
                                            className="hover:bg-muted-foreground/20 ml-1 rounded-full outline-none"
                                            onClick={(e) => {
                                                e.stopPropagation(); // Quan trọng: Ngăn không cho Popover đóng/mở
                                                handleUnselect(cat.id);
                                            }}
                                        >
                                            <X className="text-muted-foreground hover:text-foreground h-3 w-3" />
                                        </span>
                                    </Badge>
                                ))
                        ) : (
                            <span className="text-muted-foreground">
                                Chọn danh mục...
                            </span>
                        )}
                    </div>
                    <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
                </div>
            </PopoverTrigger>
            <PopoverContent
                className="w-[--radix-popover-trigger-width] p-0"
                align="start"
            >
                <Command>
                    <CommandInput placeholder="Tìm danh mục..." />
                    <CommandEmpty>Không tìm thấy danh mục.</CommandEmpty>
                    <CommandGroup className="max-h-64 overflow-auto">
                        {categories.map((category) => (
                            <CommandItem
                                key={category.id}
                                onSelect={() => {
                                    onChange(
                                        selected.includes(category.id)
                                            ? selected.filter(
                                                  (s) => s !== category.id,
                                              )
                                            : [...selected, category.id],
                                    );
                                    setOpen(true);
                                }}
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        selected.includes(category.id)
                                            ? "opacity-100"
                                            : "opacity-0",
                                    )}
                                />
                                {category.name}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
