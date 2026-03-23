import { ActionData } from "@/components/FlowCanvas/types/node/action.type";
import { CollectionData } from "@/components/FlowCanvas/types/node/collection.type";
import { MessageData } from "@/components/FlowCanvas/types/node/message.type";
import type { Node, NodeProps } from "@xyflow/react";

export type FlowNodeType = "message" | "action" | "collection";
export type NodeOf<
    TType extends FlowNodeType,
    TData extends Record<string, unknown>,
> = Node<TData, TType>;
export type MessageNodeData = {
    label: string;
    note?: string;
    markStart?: boolean;
    messages: MessageData[];
};

export type ActionNodeData = {
    label: string;
    note?: string;
    markStart?: boolean;
    messages: ActionData[];
};

export type CollectionNodeData = {
    label: string;
    note?: string;
    markStart?: boolean;
    messages: CollectionData;
};

export type FlowNode =
    | Node<MessageNodeData, "message">
    | Node<ActionNodeData, "action">
    | Node<CollectionNodeData, "collection">;

export type MessageNodeProps = NodeProps<Node<MessageNodeData, "message">>;
export type ActionNodeProps = NodeProps<Node<ActionNodeData, "action">>;
export type CollectionNodeProps = NodeProps<
    Node<CollectionNodeData, "collection">
>;
