import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import FlowJsonBtn from "@/components/FlowCanvas/Canvas/components/JsonBtns/components/FlowJSonBtn/FlowJsonBtn";
import LayoutJsonBtn from "@/components/FlowCanvas/Canvas/components/JsonBtns/components/LayoutJsonBtn/LayoutJsonBtn";
import { Button } from "@/components/ui/button";
import { Code } from "lucide-react";

function JsonBtns() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant={"secondary"}
                    className="text-xs font-medium"
                    size={"sm"}
                >
                    <Code /> JSON
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex w-[min(90vw,16rem)] flex-col items-stretch gap-2 p-2">
                <LayoutJsonBtn />
                <FlowJsonBtn />
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default JsonBtns;
