"use client";

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IndentDecrease, LayoutGrid } from "lucide-react";
import { useNodeStore } from "@/store/nodeStore";
import { useEdgeStore } from "@/store/edgeStore";
import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { compileFlow } from "@/components/FlowCanvas/Flow/Compiler";
import type { FlowNode } from "@/components/FlowCanvas/types/node/node.type";
import type { Edge } from "@xyflow/react";
import { toast } from "sonner";
import { commandManager } from "@/components/FlowCanvas/Commands/CommandManager";
import type { editor } from "monaco-editor";

const MonacoEditor = dynamic(
    () => import("@monaco-editor/react").then((m) => m.default),
    {
        ssr: false,
        loading: () => (
            <div className="border-input bg-muted/30 text-muted-foreground flex h-[min(72vh,720px)] min-h-[360px] items-center justify-center rounded-md border text-sm">
                Đang tải trình soạn thảo...
            </div>
        ),
    },
);

function LayoutJsonBtn() {
    const { resolvedTheme } = useTheme();
    const [open, setOpen] = useState(false);
    const [text, setText] = useState("");
    const [error, setError] = useState<string | null>(null);
    const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

    const monacoTheme = resolvedTheme === "dark" ? "vs-dark" : "light";

    const handleOpenChange = (next: boolean) => {
        if (next) {
            const nodes = useNodeStore.getState().nodes;
            const edges = useEdgeStore.getState().edges;
            setText(JSON.stringify({ nodes, edges }, null, 2));
            setError(null);
        }
        setOpen(next);
    };

    const handleFormat = () => {
        const ed = editorRef.current;
        if (!ed) return;
        void ed.getAction("editor.action.formatDocument")?.run();
    };

    const handleSave = () => {
        setError(null);

        let parsed: unknown;
        try {
            parsed = JSON.parse(text);
        } catch (e) {
            const msg =
                e instanceof Error ? e.message : "Không parse được JSON";
            setError(msg);
            toast.error(msg);
            return;
        }

        if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
            const msg = "JSON phải là object chứa nodes và edges";
            setError(msg);
            toast.error(msg);
            return;
        }

        const rec = parsed as Record<string, unknown>;
        const nodes = rec.nodes;
        const edges = rec.edges;

        if (!Array.isArray(nodes) || !Array.isArray(edges)) {
            const msg = "nodes và edges phải là mảng";
            setError(msg);
            toast.error(msg);
            return;
        }

        try {
            compileFlow(nodes as FlowNode[], edges as Edge[]);
        } catch (e) {
            const msg = e instanceof Error ? e.message : "Flow không hợp lệ";
            setError(msg);
            toast.error(msg);
            return;
        }

        commandManager.clearHistory();
        useNodeStore.getState().setNodes(nodes as FlowNode[]);
        useEdgeStore.getState().setEdges(edges as Edge[]);
        toast.success("Đã áp dụng Layout JSON");
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <LayoutGrid />
                    Chỉnh sửa Layout JSON
                </Button>
            </DialogTrigger>

            <DialogContent className="h-[95vh] gap-3 sm:max-w-[min(95vw,72rem)]">
                <DialogHeader>
                    <DialogTitle>Layout JSON (canvas)</DialogTitle>
                </DialogHeader>

                {error ? (
                    <p className="text-destructive text-sm" role="alert">
                        {error}
                    </p>
                ) : null}

                <div className="flex justify-end">
                    <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        className="gap-1.5"
                        onClick={handleFormat}
                    >
                        <IndentDecrease className="size-3.5" />
                        Định dạng
                    </Button>
                </div>

                <div
                    className="min-h-[280px] overflow-hidden rounded-md border"
                    aria-invalid={Boolean(error)}
                >
                    <MonacoEditor
                        height="100%"
                        language="json"
                        theme={monacoTheme}
                        value={text}
                        onChange={(v) => setText(v ?? "")}
                        onMount={(ed) => {
                            editorRef.current = ed;
                        }}
                        options={{
                            minimap: { enabled: false },
                            fontSize: 14,
                            tabSize: 2,
                            insertSpaces: true,
                            formatOnPaste: true,
                            automaticLayout: true,
                            scrollBeyondLastLine: false,
                            wordWrap: "on",
                            folding: true,
                            bracketPairColorization: { enabled: true },
                            renderLineHighlight: "line",
                        }}
                    />
                </div>

                <DialogFooter>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => setOpen(false)}
                    >
                        Hủy
                    </Button>
                    <Button type="button" onClick={handleSave}>
                        Lưu
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default LayoutJsonBtn;
