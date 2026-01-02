import type { FlowNode } from "../types/node/node.type";
import { validateMessageNode } from "./rules/message.rules";
import { validateCollectionNode } from "./rules/collection.rules";
import { validateActionNode } from "./rules/action.rules";
import type { ValidationError } from "./types";

export function validateNode(node: FlowNode): ValidationError[] {
    switch (node.type) {
        case "message":
            return validateMessageNode(node);
        case "collection":
            return validateCollectionNode(node);
        case "action":
            return validateActionNode(node);
        default:
            return [];
    }
}
