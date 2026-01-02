import BaseContent from "@/components/FlowCanvas/Nodes/BaseContent/BaseContent";

function MediaNode({ node }: { node: any }) {
    return (
        <BaseContent id={node.id}>
            <div className="p-2">Media Node</div>
        </BaseContent>
    );
}

export default MediaNode;
