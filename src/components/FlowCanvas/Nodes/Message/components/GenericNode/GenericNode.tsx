import BaseContent from "@/components/FlowCanvas/Nodes/BaseContent/BaseContent";

function GenericNode({ node }: { node: any }) {
    return (
        <BaseContent id={node.id}>
            <div className="p-2">Generic Node</div>
        </BaseContent>
    );
}

export default GenericNode;
