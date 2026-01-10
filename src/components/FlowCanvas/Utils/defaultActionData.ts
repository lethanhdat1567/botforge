import { ActionData } from "@/components/FlowCanvas/types/node/action.type";
import { v4 as uuid } from "uuid";

export function getDefaultActionData(
    actionType: ActionData["type"],
): ActionData {
    switch (actionType) {
        case "condition":
            return {
                id: uuid(),
                type: "condition",
                fields: {
                    items: [
                        {
                            conditions: [
                                {
                                    field: "",
                                    operator: "equals",
                                    value: "",
                                },
                            ],
                        },
                    ],
                },
            };
        case "delay":
            return {
                id: uuid(),
                type: "delay",
                fields: {
                    duration: 1,
                    unit: "second",
                },
            };
        case "set_variable":
            return {
                id: uuid(),
                type: "set_variable",
                fields: {
                    key: "",
                    value: "",
                },
            };
        default:
            return {
                id: uuid(),
                type: "delay",
                fields: { duration: 1, unit: "second" },
            };
    }
}
