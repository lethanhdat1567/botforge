import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy, Check, Workflow } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useNodeStore } from "@/store/nodeStore";
import { useEdgeStore } from "@/store/edgeStore";
import { useState, useMemo } from "react";
import { compileFlow } from "@/components/FlowCanvas/Flow/Compiler";

function FlowJsonBtn() {
    const nodes = useNodeStore((s) => s.nodes);
    const edges = useEdgeStore((s) => s.edges);
    const [copied, setCopied] = useState(false);

    // ✅ compile flow (memo để không recompute liên tục)
    const flowJson = useMemo(() => {
        try {
            return compileFlow(nodes, edges);
        } catch (e: any) {
            return { error: e.message };
        }
    }, [nodes, edges]);

    const json = JSON.stringify(flowJson, null, 2);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(json);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <Workflow />
                    Xem Flow Json
                </Button>
            </DialogTrigger>

            <DialogContent className="min-h-[50vh] max-w-[70vw]!">
                <DialogHeader className="hidden">
                    <DialogTitle>Flow JSON</DialogTitle>
                </DialogHeader>

                {/* Header actions */}
                <div className="mb-2 flex justify-end">
                    <Button
                        size="sm"
                        variant="secondary"
                        onClick={handleCopy}
                        className="gap-2"
                    >
                        {copied ? (
                            <>
                                <Check size={14} />
                                Đã sao chép
                            </>
                        ) : (
                            <>
                                <Copy size={14} />
                                Sao chép
                            </>
                        )}
                    </Button>
                </div>

                <div className="h-[80vh] w-full overflow-auto rounded-md">
                    <SyntaxHighlighter
                        language="javascript"
                        style={vscDarkPlus}
                    >
                        {json}
                    </SyntaxHighlighter>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default FlowJsonBtn;
