import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Square, Copy, Check } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useNodeStore } from "@/store/nodeStore";
import { useState } from "react";

function NodeJsonBtn() {
    const nodes = useNodeStore((s) => s.nodes);
    const [copied, setCopied] = useState(false);

    const json = JSON.stringify(nodes, null, 2);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(json);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <Square />
                    View Node Json
                </Button>
            </DialogTrigger>

            <DialogContent className="min-h-[50vh] max-w-[70vw]!">
                <DialogHeader className="hidden">
                    <DialogTitle>Node JSON</DialogTitle>
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
                                Copied
                            </>
                        ) : (
                            <>
                                <Copy size={14} />
                                Copy
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

export default NodeJsonBtn;
