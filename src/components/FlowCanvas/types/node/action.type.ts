//  Action node

export type ActionType = "condition" | "delay" | "set_variable";

export type ActionData =
    | ConditionActionData
    | DelayActionData
    | SetVariableActionData;

// Condition node
export interface ConditionActionData {
    type: "condition";
    fields: {
        items: {
            conditions: {
                field: string; // payload, variable, ...
                operator: "equals" | "not_equals" | "contains" | "regex";
                value: any;
            }[];
            next: string; // nodeId nếu tất cả điều kiện trong item thỏa
        }[];
    };
}

// Delay node
export interface DelayActionData {
    type: "delay";
    fields: {
        duration: string; // ms
    };
}

// Set Variable node
export interface SetVariableActionData {
    type: "set_variable";
    fields: {
        key: string;
        value: any;
    };
}
