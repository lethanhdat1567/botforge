import EdgeJsonBtn from "@/components/FlowCanvas/Canvas/components/JsonBtns/components/EdgeJsonBtn/EdgeJsonBtn";
import NodeJsonBtn from "@/components/FlowCanvas/Canvas/components/JsonBtns/components/NodeJsonBtn/NodeJsonBtn";

function JsonBtns() {
    return (
        <div className="bg-background flex items-center gap-4 border p-2 shadow">
            <NodeJsonBtn />
            <EdgeJsonBtn />
        </div>
    );
}

export default JsonBtns;
