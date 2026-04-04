"use client";

import { compileFlow } from "@/components/FlowCanvas/Flow/Compiler";
import useDebounce from "@/hooks/use-debounce";
import { useAutoSaveBaselineStore } from "@/store/autoSaveBaselineStore";
import { useEdgeStore } from "@/store/edgeStore";
import { useNodeStore } from "@/store/nodeStore";
import { useEffect, useMemo, useRef, useState } from "react";
import isEqual from "fast-deep-equal";
import { flowService } from "@/services/flowService";
import { useSearchParams } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { Check } from "lucide-react";
import type { Edge } from "@xyflow/react";
import type { FlowNode } from "@/components/FlowCanvas/types/node/node.type";

type LogicCompiled = ReturnType<typeof compileFlow>;

/** logicJson null = compile/validate lỗi — vẫn lưu layoutJson lên server */
type PersistPayload = {
    logicJson: LogicCompiled | null;
    layoutJson: { nodes: FlowNode[]; edges: Edge[] };
};

type AutoSaveProps = {
    /** Chỉ PATCH sau khi load flow xong cho flowId hiện tại (tránh race với state chưa hydrate). */
    hydrationReady?: boolean;
};

function AutoSave({ hydrationReady = true }: AutoSaveProps) {
    const nodes = useNodeStore((s) => s.nodes);
    const edges = useEdgeStore((s) => s.edges);
    const isDragging = useNodeStore((s) => s.isDragging);
    const isConnecting = useEdgeStore((s) => s.isConnecting);
    const searchParams = useSearchParams();
    const flowId = searchParams.get("flowId");
    const [loading, setLoading] = useState(false);

    const baseline = useAutoSaveBaselineStore((s) => s.baseline);
    const baselineFlowId = useAutoSaveBaselineStore((s) => s.flowId);

    const payload = useMemo((): PersistPayload => {
        const layoutJson = { nodes, edges };
        try {
            return {
                logicJson: compileFlow(nodes, edges),
                layoutJson,
            };
        } catch {
            return { logicJson: null, layoutJson };
        }
    }, [nodes, edges]);

    const debouncedPayload = useDebounce(payload, 1000);
    const lastSavedRef = useRef<PersistPayload | null>(null);
    const saveSeqRef = useRef(0);

    const payloadRef = useRef(payload);
    const debouncedRef = useRef(debouncedPayload);
    const lastSavedForUnloadRef = useRef<PersistPayload | null>(null);
    const loadingRef = useRef(loading);
    const flowIdRef = useRef(flowId);

    useEffect(() => {
        payloadRef.current = payload;
        debouncedRef.current = debouncedPayload;
        lastSavedForUnloadRef.current = lastSavedRef.current;
        loadingRef.current = loading;
        flowIdRef.current = flowId;
    }, [payload, debouncedPayload, loading, flowId]);

    useEffect(() => {
        if (!flowId) {
            lastSavedRef.current = null;
            return;
        }
        if (baselineFlowId === flowId && baseline) {
            lastSavedRef.current = baseline as PersistPayload;
        }
    }, [flowId, baselineFlowId, baseline]);

    useEffect(() => {
        if (!flowId || !hydrationReady) return;

        if (
            lastSavedRef.current &&
            isEqual(lastSavedRef.current, debouncedPayload)
        ) {
            return;
        }

        const seq = ++saveSeqRef.current;
        const sent: PersistPayload = debouncedPayload;

        queueMicrotask(() => setLoading(true));
        const body: Parameters<typeof flowService.updateFlow>[1] = {
            layoutJson: sent.layoutJson,
        };
        if (sent.logicJson !== null) {
            body.logicJson = sent.logicJson;
        }

        flowService
            .updateFlow(flowId, body)
            .then(() => {
                if (seq !== saveSeqRef.current) return;
                lastSavedRef.current = sent;
                lastSavedForUnloadRef.current = sent;
            })
            .catch((err) => {
                console.error("[AutoSave] updateFlow failed", err);
            })
            .finally(() => {
                if (seq === saveSeqRef.current) {
                    setLoading(false);
                }
            });
    }, [debouncedPayload, isDragging, isConnecting, flowId, hydrationReady]);

    useEffect(() => {
        function handleBeforeUnload(e: BeforeUnloadEvent) {
            const fid = flowIdRef.current;
            if (!fid) return;

            if (loadingRef.current) {
                e.preventDefault();
                e.returnValue =
                    "Đang lưu flow. Bạn có chắc muốn rời trang? Thay đổi có thể chưa được lưu.";
                return;
            }

            const p = payloadRef.current;
            const d = debouncedRef.current;
            const saved = lastSavedForUnloadRef.current;

            if (!isEqual(p, d)) {
                e.preventDefault();
                e.returnValue =
                    "Còn thay đổi chưa kịp lưu (đang chờ). Bạn có chắc muốn rời trang?";
                return;
            }

            if (saved && !isEqual(d, saved)) {
                e.preventDefault();
                e.returnValue =
                    "Auto save chưa hoàn tất hoặc lưu lỗi. Bạn có chắc muốn rời trang?";
                return;
            }
        }

        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => window.removeEventListener("beforeunload", handleBeforeUnload);
    }, []);

    const layoutOnlySaved =
        debouncedPayload.logicJson === null && Boolean(flowId);

    return loading ? (
        <div className="flex h-10 min-w-20 shrink-0 items-center gap-2 text-sm">
            <Spinner /> Đang lưu...
        </div>
    ) : layoutOnlySaved ? (
        <div
            className="flex h-10 min-w-34 shrink-0 items-center gap-2 text-sm text-amber-600 dark:text-amber-500"
            title="Graph chưa biên dịch được (edge/node lỗi). Đã lưu bố cục canvas."
        >
            <Check size={16} /> Đã lưu bố cục
        </div>
    ) : (
        <div className="flex h-10 w-20 shrink-0 items-center gap-2 text-sm">
            <Check size={16} className="text-green-500" /> Đã lưu
        </div>
    );
}

export default AutoSave;
