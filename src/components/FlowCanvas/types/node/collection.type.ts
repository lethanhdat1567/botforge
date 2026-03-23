import { ButtonNode } from "@/components/FlowCanvas/types/node/button.type";

export interface DelayField {
    unit: "s" | "m" | "h";
    duration: number;
}

export type CollectionType = "collection";

export type CollectionVariableType =
    | "text"
    | "number"
    | "email"
    | "phone"
    | "custom";

export type VariableData = {
    key: string;
    regex?: string;
    regexMessage?: string;
};

export type FallbackData = {
    timeout: DelayField;
    message: string;
};

export interface CollectionData {
    id: string;
    type: CollectionType;
    fields: {
        type: CollectionVariableType;
        text: string;
        buttons: ButtonNode[];
        variable: VariableData;
        fallback: FallbackData;
    };
}
