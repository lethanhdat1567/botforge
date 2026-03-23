//  Action node

export type ActionType = "condition" | "delay" | "set_variable";

export type ActionData =
    | ConditionActionData
    | DelayActionData
    | SetVariableActionData;

// Condition node
export interface ConditionItem {
    id: string;
    key: string;
    value: any;
}
export interface ConditionActionData {
    id: string;
    type: "condition";
    fields: {
        items: ConditionItem[];
        next?: string;
    };
}

// Delay node
export interface DelayActionData {
    id: string;
    type: "delay";
    fields: {
        duration: number;
        unit: "s" | "m" | "h";
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
