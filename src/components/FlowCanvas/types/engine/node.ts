export type NodeCategory = "message" | "action" | "collection";

export interface EngineNode {
    id: string;
    category: NodeCategory;
    payload: any;
    children?: Record<string, string>;
}
