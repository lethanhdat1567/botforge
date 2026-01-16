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
            fallback: string;
            timeout: string;
        };
    };
}
