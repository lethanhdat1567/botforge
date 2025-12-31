export interface IFolder {
    id: string;
    userId: string;
    name: string;
    platform: "facebook" | "instagram" | "zalo";
    createdAt: Date;
    updatedAt: Date;
}
