"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useDebounce from "@/hooks/use-debounce";
import { useIsMobile } from "@/hooks/use-mobile";
import CreateInput from "@/layouts/dragdrop/DragdropSidebar/components/CreateInput/CreateInput";
import FlowList from "@/layouts/dragdrop/DragdropSidebar/components/FlowList/FlowList";
import Heading from "@/layouts/dragdrop/DragdropSidebar/components/Heading/Heading";
import PageModel from "@/layouts/dragdrop/DragdropSidebar/components/PageModel/PageModel";
import SearchInput from "@/layouts/dragdrop/DragdropSidebar/components/SearchInput/SearchInput";
import { FlowList as FlowListType, flowService } from "@/services/flowService";
import { ChevronsRight, Plus } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import { useEffect, useState, useCallback } from "react";

function DragdropSidebar() {
    const isMobile = useIsMobile();
    const [desktopExpand, setDesktopExpand] = useState(true);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const expand = isMobile ? mobileMenuOpen : desktopExpand;

    const setExpand: Dispatch<SetStateAction<boolean>> = useCallback(
        (next) => {
            if (isMobile) {
                setMobileMenuOpen((m) =>
                    typeof next === "function" ? next(m) : next,
                );
            } else {
                setDesktopExpand((d) =>
                    typeof next === "function" ? next(d) : next,
                );
            }
        },
        [isMobile],
    );

    const [isCreate, setIsCreate] = useState(false);
    const [search, setSearch] = useState("");
    const [flows, setFlows] = useState<FlowListType[]>([]);
    const debounceSearch = useDebounce(search, 500);

    const fetchFlows = async () => {
        try {
            const res = await flowService.getFlows({
                q: debounceSearch,
            });

            setFlows(res.flows);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchFlows();
    }, [debounceSearch]);

    const sidebarBody = (
        <>
            <Heading setExpand={setExpand} />
            <div className="mt-4 flex min-w-0 items-center gap-2">
                <div className="min-w-0 flex-1">
                    <SearchInput
                        searchValue={search}
                        setSearchValue={setSearch}
                    />
                </div>
                <Button
                    variant={"outline"}
                    size="icon"
                    className="shrink-0"
                    onClick={() => {
                        setIsCreate(true);
                    }}
                >
                    <Plus className="size-4" />
                </Button>
            </div>
            {isCreate && (
                <CreateInput
                    onCreate={() => {
                        setIsCreate(false);
                        fetchFlows();
                    }}
                />
            )}
            <FlowList flows={flows} fetchFlows={fetchFlows} />
        </>
    );

    const rail = (
        <button
            type="button"
            onClick={() => setExpand(true)}
            className="hover:bg-muted flex h-full min-h-0 w-full cursor-pointer items-center justify-center"
            aria-label="Mở danh sách flow"
        >
            <ChevronsRight size={20} />
        </button>
    );

    return (
        <>
            <div
                className={cn(
                    "relative z-30 flex h-svh shrink-0 flex-col border-r border-border bg-background transition-[width,padding] duration-300",
                    isMobile
                        ? expand
                            ? "w-0 min-w-0 overflow-visible border-0 bg-transparent p-0"
                            : "w-10"
                        : expand
                          ? "w-100 p-4"
                          : "w-10 p-0",
                )}
            >
                {isMobile && expand && (
                    <>
                        <button
                            type="button"
                            className="fixed inset-0 z-40 bg-background/70 backdrop-blur-sm"
                            aria-label="Đóng menu"
                            onClick={() => setExpand(false)}
                        />
                        <div
                            className="fixed inset-y-0 left-0 z-50 flex h-svh w-[min(100vw,22rem)] max-w-full flex-col overflow-y-auto overscroll-contain border-r border-border bg-background p-4 shadow-xl"
                            role="dialog"
                            aria-modal="true"
                            aria-label="Danh sách flow"
                        >
                            {sidebarBody}
                        </div>
                    </>
                )}

                {!isMobile && expand && (
                    <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
                        {sidebarBody}
                    </div>
                )}

                {!isMobile && !expand && rail}
                {isMobile && !expand && rail}
            </div>
            <PageModel onRefresh={fetchFlows} />
        </>
    );
}

export default DragdropSidebar;
