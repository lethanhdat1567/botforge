import { NodeRegistryMap } from "../Registry";
import type { FlowNodeType } from "../types/node/node.type";
import { useNodeStore } from "@/store/nodeStore";
import { MessageData } from "@/components/FlowCanvas/types/node/message.type";
import { ActionData } from "@/components/FlowCanvas/types/node/action.type";
import { CollectionData } from "@/components/FlowCanvas/types/node/collection.type";

export class AddNodeCommand {
    private newNode: any;
    constructor(
        private nodeType: FlowNodeType,
        private messageType:
            | MessageData["type"]
            | ActionData["type"]
            | CollectionData["type"],
    ) {}

    execute() {
        const registry = NodeRegistryMap[this.nodeType];

        this.newNode = registry.create(this.messageType);

        useNodeStore.getState().addNode(this.newNode);
    }

    undo() {
        // xóa node nếu cần undo
        useNodeStore.getState().removeNode(this.newNode.id);
    }
}
