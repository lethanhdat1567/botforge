import { v4 as uuid } from "uuid";
import { CollectionNodeData } from "@/components/FlowCanvas/types/node/node.type";
import { NodeRegistry } from "@/components/FlowCanvas/types/registry/registry";
import {
    CollectionData,
    CollectionVariableType,
} from "@/components/FlowCanvas/types/node/collection.type";
import { getDefaultCollectionData } from "@/components/FlowCanvas/Utils/defaultCollectionData";

export const CollectionRegistry: NodeRegistry<
    "collection",
    CollectionNodeData
> = {
    type: "collection",

    create(
        messageType: CollectionVariableType,
        position: { x: number; y: number },
    ) {
        const defaultCollection: CollectionData =
            getDefaultCollectionData(messageType);

        return {
            id: uuid(),
            type: "collection",
            position: position,
            data: {
                label: "Collection",
                messages: defaultCollection,
            },
        };
    },

    update(node, patch) {
        return {
            ...node,
            data: {
                ...node.data,
                ...patch,
            },
        };
    },
    updatePayload(node, payloadId, patch) {
        return {
            ...node,
            data: {
                ...node.data,
                messages: {
                    ...node.data.messages,
                    fields: {
                        ...node.data.messages.fields,
                        ...patch,
                    },
                },
            },
        };
    },

    duplicate(node) {
        return {
            ...node,
            id: uuid(),
            position: {
                x: node.position.x + 300,
                y: node.position.y,
            },
        };
    },
};
