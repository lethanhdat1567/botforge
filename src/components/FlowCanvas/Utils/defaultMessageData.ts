import { ButtonNode } from "@/components/FlowCanvas/types/node/button.type";
import {
    MessageData,
    GenericTemplateElement,
    CouponTemplateElement,
    ReceiptTemplateElement,
} from "@/components/FlowCanvas/types/node/message.type";
import { v4 as uuid } from "uuid";

export function getDefaultMessageData(type: MessageData["type"]): MessageData {
    const id = uuid(); // tạo id mới

    switch (type) {
        case "text":
            return {
                id,
                type: "button",
                fields: { text: "", buttons: [] as ButtonNode[] },
            };
        case "image":
            return {
                id,
                type: "image",
                fields: {
                    url: "",
                },
            };
        case "audio":
            return {
                id,
                type: "audio",
                fields: {
                    url: "",
                },
            };
        case "video":
            return {
                id,
                type: "video",
                fields: {
                    url: "",
                },
            };
        case "sender_actions":
            return {
                id,
                type: "sender_actions",
                fields: { action: "typing_on" },
            };
        case "welcome_screen":
            return {
                id,
                type: "welcome_screen",
                fields: { text: "", postback: "", referral: null },
            };
        case "persistent_menu":
            return {
                id,
                type: "persistent_menu",
                fields: { text: "", menuItems: [] as ButtonNode[] },
            };
        case "generic_template":
            return {
                id,
                type: "generic_template",
                fields: {
                    elements: [
                        {
                            id: uuid(),
                            title: "",
                            subtitle: "",
                            image_url: "",
                            default_action: {
                                type: "web_url",
                                url: "",
                                webview_height_ratio: "full",
                            },
                            buttons: [],
                        } as GenericTemplateElement,
                    ],
                },
            };
        case "coupon_template":
            return {
                id,
                type: "coupon_template",
                fields: {
                    title: "",
                    coupon_code: "",
                    coupon_pre_message: "",
                    subtitle: "",
                    image_url: "",
                    coupon_url: "",
                    coupon_url_button_title: "",
                    payload: "",
                } as CouponTemplateElement,
            };
        case "media_template":
            return {
                id,
                type: "media_template",
                fields: {
                    media_type: "image",
                    media_url: "",
                    buttons: [] as ButtonNode[],
                },
            };
        case "receipt_template":
            return {
                id,
                type: "receipt_template",
                fields: {
                    id: uuid(),
                    recipient_name: "",
                    order_number: "",
                    currency: "",
                    payment_method: "",
                    timestamp: "",
                    elements: [],
                    address: {
                        street_1: "",
                        street_2: "",
                        city: "",
                        postal_code: "",
                        state: "",
                        country: "",
                    },
                    summary: {
                        subtotal: 0,
                        shipping_cost: 0,
                        total_tax: 0,
                        total_cost: 0,
                    },
                    adjustments: [],
                } as ReceiptTemplateElement,
            };
        default:
            return { id, type: "text", fields: { text: "" } };
    }
}
