import type { FlowNode } from "../../types/node/node.type";
import type { ValidationError } from "../types";

export function validateMessageNode(
    node: Extract<FlowNode, { type: "message" }>,
): ValidationError[] {
    const errors: ValidationError[] = [];

    if (!node.data.messages.length) {
        errors.push({
            level: "error",
            message: "Message node phải có ít nhất 1 message",
            nodeId: node.id,
        });
    }

    node.data.messages.forEach((msg, index) => {
        if (msg.type === "text" && !msg.fields.text.trim()) {
            errors.push({
                level: "error",
                message: `Text message #${index + 1} rỗng`,
                nodeId: node.id,
            });
        }
    });

    return errors;
}
