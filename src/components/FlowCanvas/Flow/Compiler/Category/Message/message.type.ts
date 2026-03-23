import { ButtonNode } from "@/components/FlowCanvas/types/node/button.type";

export type MessageType =
    | "text"
    | "image"
    | "video"
    | "audio"
    | "generic_template"
    | "media_template";

export interface MessageNode {
    id: string;
    payload: MessageDataEngine[];
    next?: string;
}

export type MessageDataEngine =
    | TextMessageData
    | AttachmentMessageData
    | GenericTemplateData
    | MediaTemplateData;

export interface MessageTextField {
    text: string;
    buttons?: ButtonNode[];
}

export interface MediaField {
    url: string;
}

export interface MediaTemplateField {
    attachment_type: "image" | "video";
    url: string;
    buttons: ButtonNode[];
}

export interface GenericElement {
    title: string;
    subtitle?: string;
    image_url?: string;
    default_action?: {
        type: "web_url";
        url: string;
    };
    buttons?: ButtonNode[];
}

export interface GenericTemplateField {
    template_type: "generic";
    image_aspect_ratio?: "square" | "horizontal";
    elements: GenericElement[];
}

export interface TextMessageData {
    category: "message";
    type: "text";
    field: MessageTextField;
}

export interface AttachmentMessageData {
    category: "message";
    type: "image" | "video" | "audio";
    field: MediaField;
}

export interface GenericTemplateData {
    category: "message";
    type: "generic_template";
    field: GenericTemplateField;
}

export interface MediaTemplateData {
    category: "message";
    type: "media_template";
    field: MediaTemplateField;
}
