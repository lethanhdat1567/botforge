import { IFolder } from "@/layouts/dragdrop/DragdropSidebar/components/FolderList/type";

export const mockFoldersGrouped: Record<string, IFolder[]> = {
    instagram: [
        {
            id: "45713bc0-b180-4bb4-a80f-d42cdaa095df",
            userId: "6a11af58-be33-464a-8bd4-a8b54fad06ec",
            name: "My Folder 1",
            platform: "instagram",
            createdAt: new Date("2025-12-31T12:50:33.570Z"),
            updatedAt: new Date("2025-12-31T12:50:33.570Z"),
        },
    ],
    facebook: [
        {
            id: "e5ca8b4e-5188-4260-9a47-5a52c9ccfe39",
            userId: "6a11af58-be33-464a-8bd4-a8b54fad06ec",
            name: "My Folder 1",
            platform: "facebook",
            createdAt: new Date("2025-12-31T12:43:16.864Z"),
            updatedAt: new Date("2025-12-31T12:43:16.864Z"),
        },
    ],
    zalo: [
        {
            id: "7a1b2c3d-4e5f-6789-abcd-1234567890ef",
            userId: "6a11af58-be33-464a-8bd4-a8b54fad06ec",
            name: "Zalo Folder Example",
            platform: "zalo",
            createdAt: new Date("2025-12-31T12:55:00.000Z"),
            updatedAt: new Date("2025-12-31T12:55:00.000Z"),
        },
    ],
};

export const platformNames: Record<string, string> = {
    facebook: "Nền tảng Facebook",
    instagram: "Nền tảng Instagram",
    zalo: "Nền tảng Zalo",
};
