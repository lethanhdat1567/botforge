"use client";

import FolderList from "@/layouts/dragdrop/DragdropSidebar/components/FolderList/FolderList";
import Heading from "@/layouts/dragdrop/DragdropSidebar/components/Heading/Heading";
import SearchFolder from "@/layouts/dragdrop/DragdropSidebar/components/SearchFolder/SearchFolder";
import { ChevronsRight } from "lucide-react";
import { useState } from "react";

function DragdropSidebar() {
    const [expand, setExpand] = useState(true);

    return (
        <div
            className={`relative h-screen ${
                expand ? "w-100 p-4" : "w-10 p-0"
            } border-r transition-all duration-300`}
        >
            {/* CONTENT */}
            <div className={`${expand ? "block" : "hidden"}`}>
                <Heading setExpand={setExpand} />
                <div className="my-4 flex items-center gap-2">
                    <SearchFolder />
                </div>
                {/* FolderList */}
                <div className="h-[calc(100vh-160px)] overflow-y-auto">
                    <FolderList />
                </div>
            </div>

            {/* EXPAND BUTTON */}
            {!expand && (
                <div
                    onClick={() => setExpand(true)}
                    className="hover:bg-muted flex h-full w-full cursor-pointer items-center justify-center"
                >
                    <ChevronsRight size={20} />
                </div>
            )}
        </div>
    );
}

export default DragdropSidebar;
