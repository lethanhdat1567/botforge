import { v4 as uuid } from "uuid";
import { CollectionNodeData } from "@/components/FlowCanvas/types/node/node.type";
import { NodeRegistry } from "@/components/FlowCanvas/types/registry/registry";

export const CollectionRegistry: NodeRegistry<
    "collection",
    CollectionNodeData
> = {
    type: "collection",

    create() {
        return {
            id: uuid(),
            type: "collection",
            position: { x: 0, y: 0 },
            data: {
                label: "Collection",
                messages: {
                    type: "collection",
                    fields: {
                        text: "",
                        buttons: [],
                        variable: {
                            type: "text",
                            key: "a",
                            fallback: "5s",
                            timeout: "sa",
                        },
                    },
                },
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
