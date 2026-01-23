export interface PageType {
    id: string;
    userId: string;
    platform: "facebook" | "instagram" | "zalo";
    pageUid: string;
    name: string;
    avatar?: string | null;
    accessToken: string;
    status: "active" | "revoked" | "expired";
    createdAt: Date;
    updatedAt: Date;
}
