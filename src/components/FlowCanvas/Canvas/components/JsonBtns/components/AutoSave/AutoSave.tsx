"use client";

import { compileFlow } from "@/components/FlowCanvas/Flow/Compiler";
import useDebounce from "@/hooks/use-debounce";
import { useEdgeStore } from "@/store/edgeStore";
import { useNodeStore } from "@/store/nodeStore";
import { useEffect, useMemo, useRef, useState } from "react";
import isEqual from "fast-deep-equal";
import { flowService } from "@/services/flowService";
import { useSearchParams } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { Check } from "lucide-react";

function AutoSave() {
    const nodes = useNodeStore((s) => s.nodes);
    const edges = useEdgeStore((s) => s.edges);
    const isDragging = useNodeStore((s) => s.isDragging);
    const isConnecting = useEdgeStore((s) => s.isConnecting);
    const searchParams = useSearchParams();
    const flowId = searchParams.get("flowId");
    const [loading, setLoading] = useState(false);

    const payload = useMemo(() => {
        try {
            return {
                logicJson: compileFlow(nodes, edges),
                layoutJson: { nodes, edges },
            };
        } catch (e: any) {
            return null;
        }
    }, [nodes, edges]);

    const debouncedPayload = useDebounce(payload, 1200);
    const lastSavedRef = useRef<any>(null);

    useEffect(() => {
        if (!debouncedPayload) return;
        if (isDragging || isConnecting) return;
        if (!flowId) return;

        // When equal object
        if (
            lastSavedRef.current &&
            isEqual(lastSavedRef.current, debouncedPayload)
        ) {
            return;
        }

        // Update
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLoading(true);
        flowService
            .updateFlow(flowId, {
                logicJson: debouncedPayload.logicJson,
                layoutJson: debouncedPayload.layoutJson,
            })
            .then(() => {})
            .catch(() => {})
            .finally(() => {
                setLoading(false);
            });

        lastSavedRef.current = debouncedPayload;
    }, [debouncedPayload, isDragging, isConnecting, flowId]);

    return loading ? (
        <div className="flex items-center gap-2 text-sm">
            <Spinner /> Saving...
        </div>
    ) : (
        <div className="flex items-center gap-2 text-sm">
            <Check size={16} className="text-green-500" /> Saved
        </div>
    );
}

export default AutoSave;
