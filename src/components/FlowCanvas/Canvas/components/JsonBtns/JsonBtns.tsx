import EdgeJsonBtn from "@/components/FlowCanvas/Canvas/components/JsonBtns/components/EdgeJsonBtn/EdgeJsonBtn";
import FlowJsonBtn from "@/components/FlowCanvas/Canvas/components/JsonBtns/components/FlowJSonBtn/FlowJsonBtn";
import NodeJsonBtn from "@/components/FlowCanvas/Canvas/components/JsonBtns/components/NodeJsonBtn/NodeJsonBtn";

function JsonBtns() {
    return (
        <div className="flex items-center gap-2">
            <NodeJsonBtn />
            <EdgeJsonBtn />
            <FlowJsonBtn />
        </div>
    );
}

export default JsonBtns;
