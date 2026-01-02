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
                label: "",
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
};
