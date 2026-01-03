import { ButtonNode } from "@/components/FlowCanvas/types/node/button.type";

export type MessageData =
    | TextMessageData
    | ButtonMessageData
    | ImageAttachmentData
    | AudioAttachmentData
    | VideoAttachmentData
    | SenderActionsData
    | WelcomeScreenData
    | PersistentMenuData
    | GenericTemplateData
    | CouponTemplateData
    | MediaTemplateData
    | ReceiptTemplateData;

// Message types
export interface TextMessageData {
    id: string;
    type: "text";
    fields: {
        text: string;
    };
}

export interface ButtonMessageData {
    id: string;
    type: "button";
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
        poster?: string; // thumbnail nếu cần
    };
}

// export interface QuickRepliesData {
//     id: string;
//     type: "quick_replies";
//     fields: {
//         text: string;
//         quickReplies: QuickReply[];
//     };
// }

export interface SenderActionsData {
    id: string;
    type: "sender_actions";
    fields: {
        action: "typing_on" | "typing_off" | "mark_seen";
    };
}

export interface WelcomeScreenData {
    id: string;
    type: "welcome_screen";
    fields: {
        text: string;
        postback: string;
        referral?: string | null;
    };
}

export interface PersistentMenuData {
    id: string;
    type: "persistent_menu";
    fields: {
        text: string;
        menuItems: ButtonNode[];
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
        webview_height_ratio?: "compact" | "tall" | "full";
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

export interface CouponTemplateElement {
    id: string;
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
    id: string;
    type: "coupon_template";
    fields: CouponTemplateElement;
}

// 2️⃣ Data/Node của Media Template
export interface MediaTemplateData {
    id: string;
    type: "media_template";
    fields: {
        media_type: "image" | "video";
        media_url: string;
        buttons?: ButtonNode[];
    };
}
export interface ReceiptTemplateElement {
    id: string;
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
    id: string;
    type: "receipt_template";
    fields: ReceiptTemplateElement;
}
