// compiler/category/message/index.ts
import { ActionDataEngine } from "@/components/FlowCanvas/Flow/Compiler/Category/Action/action.type";
import { ChildrenMap } from "@/components/FlowCanvas/Flow/Compiler/children-map";
import { EngineNode } from "@/components/FlowCanvas/types/engine/node";
import { ActionData } from "@/components/FlowCanvas/types/node/action.type";
import { FlowNode } from "@/components/FlowCanvas/types/node/node.type";

export function compileActionNode(
    node: FlowNode,
    childrenMap: ChildrenMap,
): EngineNode {
    const payloads = (node.data.messages as ActionData[]) ?? [];
    const next = childrenMap[`node-source-${node.id}`];

    return {
        id: node.id,
        category: "action",
        payload: (payloads as ActionDataEngine[])
            .map((item) => {
                switch (item.type) {
                    case "delay":
                        return {
                            type: "delay",
                            fields: {
                                duration: item.fields.duration,
                                unit: item.fields.unit,
                            },
                        };
                    case "condition":
                        return {
                            type: "condition",
                            fields: {
                                items: item.fields.items,
                                ...(item.fields.next && {
                                    next: item.fields.next,
                                }),
                            },
                        };
                    case "set_variable":
                        return {
                            type: "set_variable",
                            fields: {
                                key: item.fields.key,
                                value: item.fields.value,
                            },
                        };
                }
            })
            .filter(Boolean),
        ...(next && { children: { next } }),
    };
}
