export interface FlowType {
    id: string;
    userId: string;
    pageId?: string | null;
    folderId: string;

    name: string;
    description?: string | null;
    status: "draft" | "published";

    logicJson?: any;
    layoutJson?: any;

    timeoutDuration?: string | null;
    timeoutJson?: any;
    startNodeId?: string | null;

    createdAt: Date;
    updatedAt: Date;

    // 🔥 backward-compatible (KHÔNG lưu DB)
    platform?: "facebook" | "instagram" | "zalo";
    pageAccessToken?: string | null;
}
