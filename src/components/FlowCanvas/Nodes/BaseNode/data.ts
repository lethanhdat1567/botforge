export type NodeType = "message" | "action" | "collection";

export const typeNodeData: Record<NodeType, { color: string }> = {
    message: { color: "blue-500" },
    action: { color: "green" },
    collection: { color: "purple" },
};
