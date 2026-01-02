import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Square } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useEdgeStore } from "@/store/edgeStore";

function EdgeJsonBtn() {
    const edges = useEdgeStore((s) => s.edges);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"outline"}>
                    <Square />
                    View Node Json
                </Button>
            </DialogTrigger>
            <DialogContent className="min-h-[50vh] max-w-[70vw]!">
                <DialogHeader className="hidden">
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                </DialogHeader>
                <div className="h-[80vh] w-full overflow-scroll">
                    <SyntaxHighlighter
                        language="javascript"
                        style={vscDarkPlus}
                    >
                        {JSON.stringify(edges, null, 2)}
                    </SyntaxHighlighter>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default EdgeJsonBtn;
