import { ActionData } from "@/components/FlowCanvas/types/node/action.type";
import { CollectionVariableType } from "@/components/FlowCanvas/types/node/collection.type";
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
            | CollectionVariableType,
        position: { x: number; y: number },
    ): NodeOf<TType, TData>;

    update(
        node: NodeOf<TType, TData>,
        patch: Partial<TData>,
    ): NodeOf<TType, TData>;

    updatePayload?(
        node: NodeOf<TType, TData>,
        payloadId: string,
        patch: any,
    ): NodeOf<TType, TData>;

    duplicate(node: NodeOf<TType, TData>): NodeOf<TType, TData>;
    duplicatePayload?(
        node: NodeOf<TType, TData>,
        payloadId: string,
    ): NodeOf<TType, TData>;

    removeNode?(node: NodeOf<TType, TData>): void;
    removePayloadNode?: (
        data: any,
        payloadId: string,
    ) => {
        nextData: TData;
        removedPayload: any | null;
        removedIndex: number;
    };

    onDelete?(node: NodeOf<TType, any>): void;
}
