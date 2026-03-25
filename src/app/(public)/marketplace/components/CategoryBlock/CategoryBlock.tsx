/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { flowShareCategoryService } from "@/services/flowSharedCategoryService";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

function CategoryBlock({
    onSelect,
}: {
    onSelect?: (id: string | null) => void;
}) {
    const [categories, setCategories] = useState<any[]>([]);
    const [activeId, setActiveId] = useState<string | null>(null);

    const fetchCategories = async () => {
        try {
            const res = await flowShareCategoryService.list();
            setCategories(res);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleSelect = (id: string | null) => {
        setActiveId(id);
        if (onSelect) onSelect(id);
    };

    return (
        <ScrollArea className="">
            <div className="flex w-full items-center gap-2 pb-4">
                <div
                    onClick={() => handleSelect(null)}
                    className={cn(
                        "shrink-0 cursor-pointer rounded-sm p-2 text-[16px] font-medium transition",
                        activeId === null
                            ? "bg-neutral-100 text-neutral-950"
                            : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950",
                    )}
                >
                    Tất cả
                </div>

                {categories.map((category) => (
                    <div
                        key={category.id}
                        onClick={() => handleSelect(category.id)}
                        className={cn(
                            "shrink-0 cursor-pointer rounded-sm p-2 text-[16px] font-medium transition",
                            activeId === category.id
                                ? "bg-neutral-100 text-neutral-950"
                                : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950",
                        )}
                    >
                        {category.name}
                    </div>
                ))}
            </div>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    );
}

export default CategoryBlock;
