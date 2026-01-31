import { useEdgeStore } from "@/store/edgeStore";
import { FlowController } from "@/components/FlowCanvas/Controller/FlowController";

export function useFlowEdges() {
    const onEdgesChange = useEdgeStore((s) => s.onEdgesChange);

    const handleEdgeChange = (changes: any[]) => {
        const removedEdges = changes.filter((c) => c.type === "remove");

        if (removedEdges.length > 0) {
            removedEdges.forEach((c) => {
                FlowController.removeEdge(c.id);
            });
        } else {
            onEdgesChange(changes);
        }
    };

    return { handleEdgeChange };
}
