import { Box, MessageCircle, Zap } from "lucide-react";

export type NodeType = "message" | "action" | "collection";

export const typeNodeData: Record<NodeType, { color: string; icon: any }> = {
    message: { color: "#4988C4", icon: MessageCircle },
    action: { color: "#FF0000 ", icon: Zap },
    collection: { color: "#0D4715", icon: Box },
};
