import { FlowNodeType } from "@/components/FlowCanvas/types/node/node.type";
import { MessageRegistry } from "./message.registry";
import { NodeRegistry } from "@/components/FlowCanvas/types/registry/registry";
import { ActionRegistry } from "@/components/FlowCanvas/Registry/action.registry";
import { CollectionRegistry } from "@/components/FlowCanvas/Registry/collection.registry";

export const NodeRegistryMap = {
    message: MessageRegistry,
    action: ActionRegistry,
    collection: CollectionRegistry,
} satisfies {
    [K in FlowNodeType]: NodeRegistry<K, any>;
};
