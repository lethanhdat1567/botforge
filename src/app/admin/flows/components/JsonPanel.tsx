"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Check, Copy, NotepadText } from "lucide-react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { useState } from "react";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

function JsonPanel({ jsonData }: { jsonData: any }) {
    const json = JSON.stringify(jsonData, null, 2);
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(json);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <NotepadText />
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

export default JsonPanel;
