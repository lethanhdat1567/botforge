export type NodeCategory = "message" | "action" | "collection";

export interface EngineNode {
    id: string;
    payload: any;
    next?: string;
}
