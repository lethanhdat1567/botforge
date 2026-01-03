import ActionNode from "@/components/FlowCanvas/Nodes/Action/ActionNode";
import CollectionNode from "@/components/FlowCanvas/Nodes/Collection/CollectionNode";
import MessageNode from "@/components/FlowCanvas/Nodes/Message/MessageNode";

export const nodeTypes = {
    message: MessageNode,
    action: ActionNode,
    collection: CollectionNode,
};
