import {
    ButtonNode,
    QuickReply,
} from "@/components/FlowCanvas/types/node/button.type";

export type MessageData =
    | TextMessageData
    | ButtonMessageData
    | AttachmentMessageData
    | QuickRepliesData
    | SenderActionsData
    | WelcomeScreenData
    | PersistentMenuData
    | GenericTemplateData
    | CouponTemplateData
    | MediaTemplateData
    | ReceiptTemplateData;

// Message types
export interface TextMessageData {
    type: "text";
    fields: {
        text: string;
    };
}

export interface ButtonMessageData {
    type: "button";
    fields: {
        text: string;
        buttons: ButtonNode[];
    };
}

export interface AttachmentMessageData {
    type: "attachment";
    fields: {
        attachmentType: "image" | "video" | "audio" | "file";
        url: string;
    };
}

export interface QuickRepliesData {
    type: "quick_replies";
    fields: {
        text: string;
        quickReplies: QuickReply[];
    };
}

export interface SenderActionsData {
    type: "sender_actions";
    fields: {
        action: "typing_on" | "typing_off" | "mark_seen";
    };
}

export interface WelcomeScreenData {
    type: "welcome_screen";
    fields: {
        text: string;
        postback: string;
        referral?: string | null;
    };
}

export interface PersistentMenuData {
    type: "persistent_menu";
    fields: {
        text: string;
        menuItems: ButtonNode[];
    };
}

export interface GenericTemplateElement {
    title: string;
    subtitle?: string;
    image_url?: string;
    default_action?: {
        type: "web_url";
        url: string;
        webview_height_ratio?: "compact" | "tall" | "full";
    };
    buttons?: ButtonNode[];
}
export interface GenericTemplateData {
    type: "generic_template";
    fields: {
        elements: GenericTemplateElement[];
    };
}

export interface CouponTemplateElement {
    title: string;
    coupon_code?: string;
    coupon_pre_message?: string;
    subtitle?: string;
    image_url?: string;
    coupon_url?: string;
    coupon_url_button_title?: string;
    payload?: string;
}

export interface CouponTemplateData {
    type: "coupon_template";
    fields: CouponTemplateElement;
}

// 2️⃣ Data/Node của Media Template
export interface MediaTemplateData {
    type: "media_template";
    fields: {
        media_type: "image" | "video";
        media_url: string;
        buttons?: ButtonNode[];
    };
}
export interface ReceiptTemplateElement {
    recipient_name: string;
    order_number: string;
    currency: string;
    payment_method: string;
    timestamp?: string;
    elements: Array<{
        title: string;
        subtitle?: string;
        quantity?: number;
        price: number;
        currency?: string;
        image_url?: string;
    }>;
    address?: {
        street_1: string;
        street_2?: string;
        city: string;
        postal_code: string;
        state: string;
        country: string;
    };
    summary: {
        subtotal?: number;
        shipping_cost?: number;
        total_tax?: number;
        total_cost: number;
    };
    adjustments?: Array<{
        name?: string;
        amount: number;
    }>;
}

// Receipt template data kiểu MessageNode
export interface ReceiptTemplateData {
    type: "receipt_template";
    fields: ReceiptTemplateElement;
}
