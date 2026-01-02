import { ActionData } from "@/components/FlowCanvas/types/node/action.type";
import { CollectionData } from "@/components/FlowCanvas/types/node/collection.type";
import { MessageData } from "@/components/FlowCanvas/types/node/message.type";
import {
    FlowNodeType,
    NodeOf,
} from "@/components/FlowCanvas/types/node/node.type";

export interface NodeRegistry<
    TType extends FlowNodeType,
    TData extends Record<string, unknown>,
> {
    type: TType;

    create(
        messageType:
            | MessageData["type"]
            | ActionData["type"]
            | CollectionData["type"],
    ): NodeOf<TType, TData>;

    update(
        node: NodeOf<TType, TData>,
        patch: Partial<TData>,
    ): NodeOf<TType, TData>;

    onDelete?(node: NodeOf<TType, TData>): void;
}
