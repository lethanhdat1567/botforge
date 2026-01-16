// compiler/category/message/index.ts
import { CollectionDataEngine } from "@/components/FlowCanvas/Flow/Compiler/Category/Collection/collection.type";
import { ChildrenMap } from "@/components/FlowCanvas/Flow/Compiler/children-map";
import { EngineNode } from "@/components/FlowCanvas/types/engine/node";
import {
    CollectionData,
    CollectionVariableType,
} from "@/components/FlowCanvas/types/node/collection.type";
import { FlowNode } from "@/components/FlowCanvas/types/node/node.type";

export function compileCollectionNode(
    node: FlowNode,
    childrenMap: ChildrenMap,
): EngineNode {
    const payloads = (node.data.messages as CollectionData) ?? {};
    const next = childrenMap[node.id];

    return {
        id: node.id,
        category: node.type,
        payload: {
            type: node.type,
            fields: {
                text: payloads.fields.text,
                buttons: payloads.fields.buttons,
                variable: {
                    fallback: payloads.fields.variable.fallback,
                    key: payloads.fields.variable.key,
                    type: payloads.fields.type as CollectionVariableType,
                    regex: payloads.fields.variable.regex,
                    timeout: String(payloads.fields.variable.timeout.value),
                },
            },
        } as CollectionDataEngine,
        ...(next && { children: next }),
    };
}
