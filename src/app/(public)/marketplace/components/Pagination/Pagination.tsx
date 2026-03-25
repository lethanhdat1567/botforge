"use client";

import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export function Pagination({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationProps) {
    const getPageNumbers = () => {
        const pages = [];
        const showMax = 3;

        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1);
            if (currentPage > showMax) pages.push("ellipsis-start");

            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);

            for (let i = start; i <= end; i++) {
                if (!pages.includes(i)) pages.push(i);
            }

            if (currentPage < totalPages - (showMax - 1))
                pages.push("ellipsis-end");
            if (!pages.includes(totalPages)) pages.push(totalPages);
        }
        return pages;
    };

    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-center gap-1.5 py-10">
            <Button
                variant="outline"
                size="icon"
                className="border-border/50 text-muted-foreground h-8 w-8 transition-all hover:bg-black hover:text-white disabled:opacity-30"
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex items-center gap-1">
                {getPageNumbers().map((page, index) => {
                    if (page === "ellipsis-start" || page === "ellipsis-end") {
                        return (
                            <div
                                key={`ellipsis-${index}`}
                                className="flex h-8 w-8 items-center justify-center"
                            >
                                <MoreHorizontal className="text-muted-foreground/50 h-3 w-3" />
                            </div>
                        );
                    }

                    const pageNum = page as number;
                    return (
                        <Button
                            key={pageNum}
                            variant="ghost"
                            onClick={() => onPageChange(pageNum)}
                            className={cn(
                                "h-8 w-8 p-0 text-xs font-medium transition-all",
                                currentPage === pageNum
                                    ? "bg-black text-white hover:bg-black/90 hover:text-white"
                                    : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                            )}
                        >
                            {pageNum}
                        </Button>
                    );
                })}
            </div>

            <Button
                variant="outline"
                size="icon"
                className="border-border/50 text-muted-foreground h-8 w-8 transition-all hover:bg-black hover:text-white disabled:opacity-30"
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    );
}

export default Pagination;
