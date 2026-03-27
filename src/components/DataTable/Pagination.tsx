// components/data-table/data-table-pagination.tsx
"use client";

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { PaginationMeta } from "@/types/data-table";

interface DataTablePaginationProps {
    meta: PaginationMeta;
    onPageChange: (page: number) => void;
}

export function DataTablePagination({
    meta,
    onPageChange,
}: DataTablePaginationProps) {
    if (!meta || meta.pageCount <= 1) return null;

    return (
        <div className="flex w-full items-center justify-between border-t px-2 py-4">
            {/* Left side: Info */}
            <div className="text-muted-foreground text-[11px]">
                Trang <b>{meta.currentPage}</b> / {meta.pageCount}
                <span className="ml-1">(Tổng {meta.totalCount} mục)</span>
            </div>

            {/* Right side: Controls */}
            <Pagination className="mx-0 w-auto justify-end">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                if (!meta.isFirstPage)
                                    onPageChange(meta.currentPage - 1);
                            }}
                            className={
                                meta.isFirstPage
                                    ? "pointer-events-none opacity-40"
                                    : "cursor-pointer"
                            }
                        />
                    </PaginationItem>

                    {/* Render nhanh các số trang */}
                    {Array.from(
                        { length: meta.pageCount },
                        (_, i) => i + 1,
                    ).map((p) => (
                        <PaginationItem key={p}>
                            <PaginationLink
                                href="#"
                                isActive={meta.currentPage === p}
                                onClick={(e) => {
                                    e.preventDefault();
                                    onPageChange(p);
                                }}
                                className="h-8 w-8 cursor-pointer text-xs"
                            >
                                {p}
                            </PaginationLink>
                        </PaginationItem>
                    ))}

                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                if (!meta.isLastPage)
                                    onPageChange(meta.currentPage + 1);
                            }}
                            className={
                                meta.isLastPage
                                    ? "pointer-events-none opacity-40"
                                    : "cursor-pointer"
                            }
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}
