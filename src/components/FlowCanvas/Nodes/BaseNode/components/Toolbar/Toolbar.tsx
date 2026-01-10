import { FlowController } from "@/components/FlowCanvas/Controller/FlowController";
import { Button } from "@/components/ui/button";
import { Copy, FlagTriangleRight, Trash } from "lucide-react";
import NoteBtn from "@/components/FlowCanvas/Nodes/BaseNode/components/Toolbar/components/NoteBtn";
import { FlowNode } from "@/components/FlowCanvas/types/node/node.type";
import { useNodeStore } from "@/store/nodeStore";

function Toolbar({ node }: { node: FlowNode }) {
    const markStartNode = useNodeStore((s) => s.markStartNode);

    function handleDestroyNode() {
        FlowController.removeNode(node.id);
    }

    function handleDuplicateNode() {
        FlowController.duplicateNode(node.id);
    }

    function handleMarkStart() {
        markStartNode(node.id);
    }

    return (
        <>
            {/* Cầu nối nhỏ */}
            <div className="absolute top-0 right-0 left-0 hidden h-4 -translate-y-full bg-transparent group-hover/base:flex"></div>

            <div className="bg-background absolute -top-2 left-1/2 hidden -translate-x-1/2 -translate-y-full rounded-sm border group-hover/base:flex">
                <NoteBtn node={node} />
                <Button
                    size={"icon-lg"}
                    variant={"ghost"}
                    className="rounded-none text-blue-500 hover:bg-blue-100 hover:text-blue-500"
                    onClick={handleDuplicateNode}
                >
                    <Copy />
                </Button>
                <Button
                    size={"icon-lg"}
                    className="rounded-none text-red-500 hover:bg-red-100 hover:text-red-500"
                    variant={"ghost"}
                    onClick={handleDestroyNode}
                >
                    <Trash />
                </Button>
                {!node.data.markStart && (
                    <Button
                        size={"icon-lg"}
                        variant={"ghost"}
                        className="rounded-none text-purple-950 hover:bg-purple-100 hover:text-purple-950"
                        onClick={handleMarkStart}
                    >
                        <FlagTriangleRight />
                    </Button>
                )}
            </div>
        </>
    );
}

export default Toolbar;
