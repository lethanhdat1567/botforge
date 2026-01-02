import { Button } from "@/components/ui/button";
import { Copy, FlagTriangleRight, StickyNote, Trash } from "lucide-react";

function Toolbar() {
    return (
        <>
            {/* Cầu nối nhỏ */}
            <div className="absolute top-0 right-0 left-0 hidden h-4 -translate-y-full bg-transparent group-hover/base:flex"></div>
            <div className="bg-background absolute -top-2 left-1/2 hidden -translate-x-1/2 -translate-y-full rounded-sm border group-hover/base:flex">
                <Button
                    size={"icon-lg"}
                    variant={"ghost"}
                    className="rounded-none"
                >
                    <StickyNote />
                </Button>
                <Button
                    size={"icon-lg"}
                    variant={"ghost"}
                    className="rounded-none text-blue-500 hover:bg-blue-100 hover:text-blue-500"
                >
                    <Copy />
                </Button>
                <Button
                    size={"icon-lg"}
                    className="rounded-none text-red-500 hover:bg-red-100 hover:text-red-500"
                    variant={"ghost"}
                >
                    <Trash />
                </Button>
                <Button
                    size={"icon-lg"}
                    variant={"ghost"}
                    className="rounded-none text-purple-950 hover:bg-purple-100 hover:text-purple-950"
                >
                    <FlagTriangleRight />
                </Button>
            </div>
        </>
    );
}

export default Toolbar;
