import type { FlowNode } from "../../types/node/node.type";
import type { ValidationError } from "../types";

export function validateActionNode(
    node: Extract<FlowNode, { type: "action" }>,
): ValidationError[] {
    const errors: ValidationError[] = [];

    if (!node.data.messages.length) {
        errors.push({
            level: "error",
            message: "Action node phải có ít nhất 1 message",
            nodeId: node.id,
        });
    }

    return errors;
}
