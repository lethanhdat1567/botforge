"use client";

import { Button } from "@/components/ui/button";
import useDebounce from "@/hooks/use-debounce";
import CreateInput from "@/layouts/dragdrop/DragdropSidebar/components/CreateInput/CreateInput";
import FlowList from "@/layouts/dragdrop/DragdropSidebar/components/FlowList/FlowList";
import Heading from "@/layouts/dragdrop/DragdropSidebar/components/Heading/Heading";
import PageModel from "@/layouts/dragdrop/DragdropSidebar/components/PageModel/PageModel";
import SearchInput from "@/layouts/dragdrop/DragdropSidebar/components/SearchInput/SearchInput";
import { FlowList as FlowListType, flowService } from "@/services/flowService";
import { ChevronsRight, Plus } from "lucide-react";
import { useEffect, useState } from "react";

function DragdropSidebar() {
    const [expand, setExpand] = useState(true);
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

    return (
        <div
            className={`relative h-screen ${
                expand ? "w-100 p-4" : "w-10 p-0"
            } border-r transition-all duration-300`}
        >
            <div className={`${expand ? "block" : "hidden"}`}>
                <Heading setExpand={setExpand} />
                <div className="mt-4 flex items-center gap-2">
                    {/* Search */}
                    <SearchInput
                        searchValue={search}
                        setSearchValue={setSearch}
                    />
                    {/* Create Flow */}
                    <Button
                        variant={"outline"}
                        onClick={() => {
                            setIsCreate(true);
                        }}
                    >
                        <Plus />
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
            </div>

            {!expand && (
                <div
                    onClick={() => setExpand(true)}
                    className="hover:bg-muted flex h-full w-full cursor-pointer items-center justify-center"
                >
                    <ChevronsRight size={20} />
                </div>
            )}
            <PageModel />
        </div>
    );
}

export default DragdropSidebar;
