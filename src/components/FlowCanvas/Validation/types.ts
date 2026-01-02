export type ValidationLevel = "error" | "warning";

export interface ValidationError {
    level: ValidationLevel;
    message: string;
    nodeId?: string;
    edgeId?: string;
}
