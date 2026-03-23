import { ButtonNode } from "@/components/FlowCanvas/types/node/button.type";
import { DelayField } from "../Action/action.type";

export interface WaitingVariable {
    variable: {
        key: string;
        regex?: string;
        regexMessage?: string;
    };
    fallback: {
        timeout: DelayField;
        message: string;
    };
}

export interface CollectionField {
    text: string;
    buttons?: ButtonNode[];
    variable: {
        key: string;
        regex?: string;
        regexMessage?: string;
    };
    fallback: {
        timeout: DelayField;
        message: string;
    };
}

export type CollectionPayloadItem = {
    category: "collection";
    type: "text";
    field: CollectionField;
};

export interface CollectionNode {
    id: string;
    payload: CollectionPayloadItem[];
    next?: string;
}

export interface CollectionNodeData {
    label: string;
    note?: string;
    markStart?: boolean;
    collection: CollectionPayloadItem;
}
