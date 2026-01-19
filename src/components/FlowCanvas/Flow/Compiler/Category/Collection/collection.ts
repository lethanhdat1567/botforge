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
    const next = childrenMap[`node-source-${node.id}`];

    return {
        id: node.id,
        category: node.type,
        payload: {
            type: node.type,
            fields: {
                text: payloads.fields.text,
                buttons: payloads.fields.buttons,
                variable: {
                    fallback: {
                        mode: payloads.fields.variable.fallback.mode,
                        value: payloads.fields.variable.fallback.value,
                    },
                    key: payloads.fields.variable.key,
                    type: payloads.fields.type as CollectionVariableType,
                    regex: payloads.fields.variable.regex,
                    timeout: {
                        duration: payloads.fields.variable.timeout.duration,
                        unit: payloads.fields.variable.timeout.unit,
                        mode: payloads.fields.variable.timeout.mode,
                    },
                },
            },
        } as CollectionDataEngine,
        ...(next && { children: { next } }),
    };
}
