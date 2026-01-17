//  Action node

export type ActionType = "condition" | "delay" | "set_variable";

export type ActionDataEngine =
    | ConditionActionData
    | DelayActionData
    | SetVariableActionData;

export interface ActionNode {
    id: string;
    category: "action";
    payload: ActionDataEngine[];
    children?: Record<string, string>;
}

// Condition node
export interface ConditionActionData {
    type: "condition";
    fields: {
        items: {
            field: string;
            operator: "equals" | "not_equals" | "contains" | "regex";
            value: any;
        }[];
        next?: string;
    };
}

// Delay node
export interface DelayActionData {
    type: "delay";
    fields: {
        duration: string;
        unit: "second" | "minute" | "hour";
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
