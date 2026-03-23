import { ActionNode, ActionPayloadItem, ActionField } from "./action.type";
import { ChildrenMap } from "@/components/FlowCanvas/Flow/Compiler/children-map";
import {
    FlowNode,
    ActionNodeData,
} from "@/components/FlowCanvas/types/node/node.type";

export function compileActionNode(
    node: FlowNode,
    childrenMap: ChildrenMap,
): ActionNode {
    const data = node.data as ActionNodeData;
    const actions = data.messages ?? [];
    const next = childrenMap[`node-source-${node.id}`];

    const payload = actions
        .map((item): ActionPayloadItem | null => {
            const category = "action" as const;

            switch (item.type) {
                case "delay":
                    return {
                        category,
                        type: "delay",
                        field: {
                            duration: item.fields.duration,
                            unit: item.fields.unit,
                        },
                    };

                case "set_variable":
                    return {
                        category,
                        type: "set_variable",
                        field: {
                            name: item.fields.key,
                            value: item.fields.value,
                        },
                    };

                case "condition":
                    return {
                        category,
                        type: "condition",
                        field: {
                            items: item.fields.items.map((cond) => ({
                                field: cond.key,
                                value: cond.value,
                            })),
                            ...(childrenMap[
                                `${node.id}-condition-${item.type}`
                            ] && {
                                next: childrenMap[
                                    `${node.id}-condition-${item.type}`
                                ],
                            }),
                        },
                    } as ActionPayloadItem;

                default:
                    return null;
            }
        })
        .filter((item): item is ActionPayloadItem => item !== null);

    return {
        id: node.id,
        payload,
        ...(next && { next }),
    };
}
