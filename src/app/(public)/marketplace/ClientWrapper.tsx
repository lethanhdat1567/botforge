/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import CategoryBlock from "@/app/(public)/marketplace/components/CategoryBlock/CategoryBlock";
import FilterBtn from "@/app/(public)/marketplace/components/FilterBtn/FilterBtn";
import FlowShareCard from "@/app/(public)/marketplace/components/FlowShareCard/FlowShareCard";
import { FlowShareSkeleton } from "@/app/(public)/marketplace/components/FlowShareSkeleton/FlowShareSkeleton";
import Pagination from "@/app/(public)/marketplace/components/Pagination/Pagination";
import SearchInput from "@/app/(public)/marketplace/components/SearchInput/SearchInput";
import { MOCK_FLOW_SHARES } from "@/app/(public)/marketplace/data";
import { Separator } from "@/components/ui/separator";
import flowShareService, { FlowShare } from "@/services/flowSharedService";
import { useEffect, useState } from "react";

function ClientWrapper() {
    const [loading, setLoading] = useState(false);
    const [flowShares, setFlowShares] = useState<FlowShare[]>([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [sortBy, setSortBy] = useState("createdAt");
    const [sortOrder, setSortOrder] = useState("desc");
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
    });

    const fetchFlowShares = async () => {
        setLoading(true);
        try {
            const res = await flowShareService.getPublic({
                limit: 9,
                page: pagination.currentPage,
                q: search,
                category: category,
                sortBy: sortBy,
                sortOrder: sortOrder,
            });

            setFlowShares(res.flowShares);
            setPagination({
                currentPage: res.meta.currentPage,
                totalPages: res.meta.pageCount,
            });
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFlowShares();
    }, [search, pagination.currentPage, category, sortBy, sortOrder]);

    function handleSearch(value: string) {
        setSearch(value);
    }

    function handleSelectCategory(categoryId: string | null) {
        setCategory(categoryId || "");
    }

    function handleSort(newSortBy: string, newSortOrder: string) {
        setSortBy(newSortBy);
        setSortOrder(newSortOrder);
    }

    function handlePagination(page: number) {
        setPagination({
            ...pagination,
            currentPage: page,
        });
    }

    return (
        <>
            <SearchInput value={search} onChange={handleSearch} />
            <div className="mt-10 grid grid-cols-12 gap-10">
                <div className="col-span-9">
                    <CategoryBlock onSelect={handleSelectCategory} />
                </div>
                <div className="col-span-3 mt-1 ml-auto">
                    <FilterBtn
                        sortBy={sortBy}
                        sortOrder={sortOrder}
                        onSort={handleSort}
                    />
                </div>
            </div>
            <Separator />
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                {loading
                    ? Array.from({ length: 6 }).map((_, index) => (
                          <FlowShareSkeleton key={index} />
                      ))
                    : flowShares.map((flow) => (
                          <FlowShareCard key={flow.id} data={flow} />
                      ))}
            </div>
            <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPageChange={handlePagination}
            />
        </>
    );
}

export default ClientWrapper;
