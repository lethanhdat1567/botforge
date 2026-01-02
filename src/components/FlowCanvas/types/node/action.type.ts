//  Action node

export type ActionType = "condition" | "delay" | "set_variable";

export type ActionData =
    | ConditionActionData
    | DelayActionData
    | SetVariableActionData;

// Condition node
export interface ConditionActionData {
    id: string;
    type: "condition";
    fields: {
        items: {
            conditions: {
                field: string; // payload, variable, ...
                operator: "equals" | "not_equals" | "contains" | "regex";
                value: any;
            }[];
        }[];
    };
}

// Delay node
export interface DelayActionData {
    id: string;
    type: "delay";
    fields: {
        duration: string; // ms
    };
}

// Set Variable node
export interface SetVariableActionData {
    id: string;
    type: "set_variable";
    fields: {
        key: string;
        value: any;
    };
}
