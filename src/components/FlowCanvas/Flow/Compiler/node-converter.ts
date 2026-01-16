import { ChildrenMap } from "./children-map";
import { EngineNode } from "@/components/FlowCanvas/types/engine/node";
import { compileMessageNode } from "@/components/FlowCanvas/Flow/Compiler/Category/Message/message";
import { FlowNode } from "@/components/FlowCanvas/types/node/node.type";
import { compileActionNode } from "@/components/FlowCanvas/Flow/Compiler/Category/Action/action";
import { compileCollectionNode } from "@/components/FlowCanvas/Flow/Compiler/Category/Collection/collection";

export function convertNode(
    node: FlowNode,
    childrenMap: ChildrenMap,
): EngineNode {
    switch (node.type) {
        case "message":
            return compileMessageNode(node, childrenMap);

        case "collection":
            return compileCollectionNode(node, childrenMap);

        case "action":
            return compileActionNode(node, childrenMap);

        default:
            throw new Error(`Unsupported category: ${(node as any).type}`);
    }
}
