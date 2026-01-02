import BaseContent from "@/components/FlowCanvas/Nodes/BaseContent/BaseContent";

function ButtonNode({ node }: { node: any }) {
    return (
        <BaseContent id={node.id}>
            <div className="p-2">Button Node</div>
        </BaseContent>
    );
}

export default ButtonNode;
