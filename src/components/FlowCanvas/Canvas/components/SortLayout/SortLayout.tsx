import { Button } from "@/components/ui/button";
import { layoutFlowLR } from "@/lib/layoutFlowLR";
import { useEdgeStore } from "@/store/edgeStore";
import { useNodeStore } from "@/store/nodeStore";
import { useReactFlow } from "@xyflow/react";
import { LayoutGrid } from "lucide-react";

function SortLayout() {
    const nodes = useNodeStore((state) => state.nodes);
    const edges = useEdgeStore((state) => state.edges);
    const { fitView } = useReactFlow();

    return (
        <Button
            size="sm"
            variant="outline"
            onClick={() => {
                const layouted = layoutFlowLR(nodes, edges);
                useNodeStore.getState().setNodes(layouted as any);
                fitView();
            }}
        >
            <LayoutGrid /> Sắp xếp
        </Button>
    );
}

export default SortLayout;
