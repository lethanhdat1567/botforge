import { CollectionNode, CollectionPayloadItem } from "./collection.type";
import { ChildrenMap } from "@/components/FlowCanvas/Flow/Compiler/children-map";
import {
    FlowNode,
    CollectionNodeData,
} from "@/components/FlowCanvas/types/node/node.type";

export function compileCollectionNode(
    node: FlowNode,
    childrenMap: ChildrenMap,
): CollectionNode {
    const data = node.data as CollectionNodeData;
    const collection = data.messages;

    const next = childrenMap[`node-source-${node.id}`];

    const payloadItem: CollectionPayloadItem = {
        category: "collection",
        type: "text",
        field: {
            text: collection.fields.text ?? "",
            ...(collection.fields.buttons?.length
                ? {
                      buttons: collection.fields.buttons,
                  }
                : {}),
            variable: {
                key: collection.fields.variable.key,
                regex: collection.fields.variable.regex,
                regexMessage: collection.fields.variable.regexMessage,
            },
            fallback: {
                timeout: {
                    duration: collection.fields.fallback.timeout.duration,
                    unit: collection.fields.fallback.timeout.unit,
                },
                message: collection.fields.fallback.message,
            },
        },
    };

    return {
        id: node.id,
        payload: [payloadItem],
        ...(next && { next }),
    };
}
