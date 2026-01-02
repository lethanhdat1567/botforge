import AttachmentNode from "@/components/FlowCanvas/Nodes/Message/components/AttachmentNode/AttachmentNode";
import TextNode from "@/components/FlowCanvas/Nodes/Message/components/TextNode/TextNode";

type Props = {
    node: {
        id: string;
        content: string;
        type: "text" | "attachment";
    };
};

function FilterMessageNode({ node }: Props) {
    switch (node.type) {
        case "text":
            return <TextNode node={node} />;
        case "attachment":
            return <AttachmentNode node={node} />;
        default:
            return <div>Unknown Node Type</div>;
    }
}

export default FilterMessageNode;
