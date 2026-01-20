import { UserFlowState } from "@/app/(private)/data/analytics/type";

export const userFlowStates: UserFlowState[] = [
    {
        id: "1",
        platformUserId: "fb_001",
        ownerUserId: "user_1",
        flowId: "flow_a",
        pageId: "page_1",
        currentStep: "welcome",
        status: "running",
        createdAt: "2025-01-01T10:00:00Z",
        updatedAt: "2025-01-01T10:05:00Z",
    },
    {
        id: "2",
        platformUserId: "fb_002",
        ownerUserId: "user_1",
        flowId: "flow_b",
        pageId: "page_2",
        currentStep: "payment",
        status: "completed",
        createdAt: "2025-01-02T09:00:00Z",
        updatedAt: "2025-01-02T09:10:00Z",
    },
    {
        id: "3",
        platformUserId: "fb_003",
        ownerUserId: "user_2",
        flowId: "flow_a",
        pageId: "page_1",
        currentStep: "form",
        status: "pending",
        createdAt: "2025-01-03T08:00:00Z",
        updatedAt: "2025-01-03T08:00:00Z",
    },
];
