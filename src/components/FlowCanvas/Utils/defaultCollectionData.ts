import {
    CollectionData,
    CollectionVariableType,
} from "@/components/FlowCanvas/types/node/collection.type";
import { ButtonNode } from "@/components/FlowCanvas/types/node/button.type";
import { v4 as uuid } from "uuid";

export function getDefaultCollectionData(
    variableType: CollectionVariableType,
): CollectionData {
    return {
        id: uuid(),
        type: "collection",
        fields: {
            text: "",
            buttons: [] as ButtonNode[],
            type: variableType, // gán type từ param
            variable: {
                key: "",
                value: "",
                regex: "",
                fallback: "",
                timeout: "30000", // mặc định 30 giây
            },
        },
    };
}
