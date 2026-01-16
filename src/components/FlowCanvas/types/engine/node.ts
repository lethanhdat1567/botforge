export type NodeCategory = "message" | "action" | "collection";

export interface EngineNode {
    id: string;
    category: NodeCategory;
    payload: any;
    children?: string;
}
