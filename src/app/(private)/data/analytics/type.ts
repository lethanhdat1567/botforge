// types/user-flow-state.ts

export type UserFlowStatus = "running" | "pending" | "cancelled" | "completed";

export interface UserFlowState {
    id: string;
    platformUserId: string;
    ownerUserId: string;
    flowId: string;
    pageId: string;
    currentStep: string;

    stepHistory?: any[]; // JSON array (giữ giống BE)
    variables?: Record<string, any>; // JSON object

    status: UserFlowStatus;

    createdAt: string; // FE dùng string (ISO)
    updatedAt: string;
}
