import {
    CollectionData,
    CollectionVariableType,
} from "@/components/FlowCanvas/types/node/collection.type";
import { ButtonNode } from "@/components/FlowCanvas/types/node/button.type";
import { v4 as uuid } from "uuid";

const COLLECTION_REGEX_MAP: Record<
    Exclude<CollectionVariableType, "custom">,
    string
> = {
    text: ".*",
    number: "^[0-9]+$",
    email: "^[\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,}$",
    phone: "^(\\+84|0)[0-9]{9}$",
};

function getRegexByVariableType(type: CollectionVariableType): string {
    if (type === "custom") return "";
    return COLLECTION_REGEX_MAP[type];
}

export function getDefaultCollectionData(
    variableType: CollectionVariableType,
): CollectionData {
    return {
        id: uuid(),
        type: "collection",
        fields: {
            text: "",
            buttons: [] as ButtonNode[],
            type: variableType,
            variable: {
                key: "",
                regex: getRegexByVariableType(variableType),
                regexMessage: "Giá trị nhập vào không hợp lệ",
            },
            fallback: {
                timeout: {
                    duration: 10,
                    unit: "m",
                },
                message: "Flow của bạn đã hết hạn",
            },
        },
    };
}
