import { ButtonNode } from "@/components/FlowCanvas/types/node/button.type";

export type MessageData =
    | TextMessageData
    | ImageAttachmentData
    | AudioAttachmentData
    | VideoAttachmentData
    | GenericTemplateData
    | MediaTemplateData;

// Message types
export interface TextMessageData {
    id: string;
    type: "text";
    fields: {
        text: string;
        buttons: ButtonNode[];
    };
}

export interface ImageAttachmentData {
    id: string;
    type: "image";
    fields: {
        url: string;
    };
}

export interface AudioAttachmentData {
    id: string;
    type: "audio";
    fields: {
        url: string;
    };
}

export interface VideoAttachmentData {
    id: string;
    type: "video";
    fields: {
        url: string;
    };
}

export interface GenericTemplateElement {
    id: string;
    title: string;
    subtitle?: string;
    image_url?: string;
    default_action: {
        type: "web_url";
        url: string;
    };
    buttons?: ButtonNode[];
}
export interface GenericTemplateData {
    id: string;
    type: "generic_template";
    fields: {
        elements: GenericTemplateElement[];
    };
}

export interface MediaTemplateData {
    id: string;
    type: "media_template";
    fields: {
        media_type: "image" | "video";
        url: string;
        buttons: ButtonNode[];
    };
}
