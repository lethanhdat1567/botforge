import DelayNode from "@/components/FlowCanvas/Nodes/Action/components/DelayNode/DelayNode";

function FilterActionNode({ node }: { node: any }) {
    switch (node.type) {
        case "delay":
            return <DelayNode node={node} />;
        default:
            return <div>Unknown Action Node Type</div>;
    }
}

export default FilterActionNode;
