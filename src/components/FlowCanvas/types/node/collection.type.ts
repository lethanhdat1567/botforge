import { ButtonNode } from "@/components/FlowCanvas/types/node/button.type";

export type CollectionType = "collection";

export type CollectionVariableType =
    | "text"
    | "number"
    | "email"
    | "phone"
    | "custom";

export type VariableData = {
    key: string;
    value?: any;
    regex?: string;
    fallback: string;
    timeout: {
        duration: number;
        unit: "second" | "minute" | "hour";
    };
};

export interface CollectionData {
    id: string;
    type: CollectionType;
    fields: {
        text: string;
        buttons: ButtonNode[];
        type: CollectionVariableType;
        variable: VariableData;
    };
}
