import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import EdgeJsonBtn from "@/components/FlowCanvas/Canvas/components/JsonBtns/components/EdgeJsonBtn/EdgeJsonBtn";
import FlowJsonBtn from "@/components/FlowCanvas/Canvas/components/JsonBtns/components/FlowJSonBtn/FlowJsonBtn";
import NodeJsonBtn from "@/components/FlowCanvas/Canvas/components/JsonBtns/components/NodeJsonBtn/NodeJsonBtn";
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
            <DropdownMenuContent className="flex flex-col items-center gap-2">
                <NodeJsonBtn />
                <EdgeJsonBtn />
                <FlowJsonBtn />
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default JsonBtns;
