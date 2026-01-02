import type { FlowNode } from "../../types/node/node.type";
import type { ValidationError } from "../types";

export function validateCollectionNode(
    node: Extract<FlowNode, { type: "collection" }>,
): ValidationError[] {
    const errors: ValidationError[] = [];
    const variable = node.data.messages.fields.variable;

    if (!variable.key) {
        errors.push({
            level: "error",
            message: "Collection variable key không được rỗng",
            nodeId: node.id,
        });
    }

    return errors;
}
