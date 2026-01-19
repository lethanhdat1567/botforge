import { ButtonNode } from "@/components/FlowCanvas/types/node/button.type";

export type CollectionType = "collection";

export type CollectionVariableType =
    | "text"
    | "number"
    | "email"
    | "phone"
    | "custom";

export interface CollectionDataEngine {
    type: CollectionType;
    fields: {
        text: string;
        buttons: ButtonNode[];
        variable: {
            type: CollectionVariableType;
            key: string;
            value?: any;
            regex?: string;
            fallback: {
                mode: "default" | "custom";
                value: string;
            };
            timeout: {
                duration: number;
                unit: "second" | "minute" | "hour";
                mode: "default" | "custom";
            };
        };
    };
}
