import AutoSave from "@/components/FlowCanvas/Canvas/components/JsonBtns/components/AutoSave/AutoSave";
import EdgeJsonBtn from "@/components/FlowCanvas/Canvas/components/JsonBtns/components/EdgeJsonBtn/EdgeJsonBtn";
import FlowJsonBtn from "@/components/FlowCanvas/Canvas/components/JsonBtns/components/FlowJSonBtn/FlowJsonBtn";
import NodeJsonBtn from "@/components/FlowCanvas/Canvas/components/JsonBtns/components/NodeJsonBtn/NodeJsonBtn";

function JsonBtns() {
    return (
        <div className="bg-background flex items-center gap-4 border p-2 shadow">
            <NodeJsonBtn />
            <EdgeJsonBtn />
            <FlowJsonBtn />
            <AutoSave />
        </div>
    );
}

export default JsonBtns;
