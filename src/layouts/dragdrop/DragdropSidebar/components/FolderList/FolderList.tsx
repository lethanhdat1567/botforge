"use client";

import { useEffect, useState } from "react";
import FolderItem from "@/layouts/dragdrop/DragdropSidebar/components/FolderList/FolderItem";
import CreateFolder from "@/layouts/dragdrop/DragdropSidebar/components/CreateFolder/CreateFolder";
import AddFolderBtn from "@/layouts/dragdrop/DragdropSidebar/components/AddFolderBtn/AddFolderBtn";
import { GamepadDirectional } from "lucide-react";
import Image from "next/image";
import { images } from "@/assets/images";
import { platformNames } from "@/layouts/dragdrop/DragdropSidebar/components/FolderList/data";
import { folderService } from "@/services/folderService";

function FolderList() {
    const [folderLists, setFolderLists] = useState<Record<string, any>>({});
    const [newFolderPlatform, setNewFolderPlatform] = useState<string | null>(
        null,
    );
    const [openPlatforms, setOpenPlatforms] = useState<Record<string, boolean>>(
        {
            facebook: true,
            instagram: false,
            zalo: false,
        },
    );

    const allPlatforms = ["facebook", "instagram", "zalo"];

    const togglePlatform = (platform: string) => {
        setOpenPlatforms((prev) => ({ ...prev, [platform]: !prev[platform] }));
    };
    const fetchFolders = async () => {
        try {
            const res = await folderService.getFolders();
            setFolderLists(res.data || {});
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchFolders();
    }, []);

    return (
        <div>
            {allPlatforms.map((platform) => (
                <div key={platform} className="flex flex-col">
                    {/* Platform Header */}
                    <div
                        className="hover:bg-muted text-md flex h-8 min-w-0 flex-1 cursor-pointer items-center gap-3 rounded-sm px-2 py-3 font-medium transition"
                        onClick={() => togglePlatform(platform)}
                    >
                        <div className="flex flex-1 items-center gap-4">
                            <GamepadDirectional size={16} />
                            <div className="flex items-center gap-2">
                                <Image
                                    className="h-8 w-8 object-cover"
                                    src={
                                        images[
                                            platform as keyof typeof images
                                        ] || images.fallback
                                    }
                                    alt={platform}
                                />
                                <h3 className="truncate text-sm font-medium">
                                    {platformNames[platform] || platform}
                                </h3>
                            </div>
                        </div>

                        <AddFolderBtn
                            onCreateFolder={() => {
                                setNewFolderPlatform(platform); // bật CreateFolder cho platform này
                                setOpenPlatforms((prev) => ({
                                    ...prev,
                                    [platform]: true,
                                })); // chắc chắn mở platform
                            }}
                        />
                    </div>

                    {/* Folder list */}
                    {openPlatforms[platform] && (
                        <div className="mt-1 space-y-1 pl-4">
                            {/* Render folders nếu có */}
                            {(folderLists[platform]?.length
                                ? folderLists[platform]
                                : []
                            ).map((folder: any) => (
                                <FolderItem
                                    key={folder.id}
                                    folderData={folder}
                                    fetchFolders={fetchFolders}
                                />
                            ))}
                            {/* Fallback */}
                            {(!folderLists[platform] ||
                                folderLists[platform]?.length === 0) && (
                                <p className="text-muted-foreground text-center text-sm italic">
                                    Rỗng
                                </p>
                            )}

                            {/* Nếu chưa có folder hoặc đang tạo folder */}
                            {newFolderPlatform === platform && (
                                <CreateFolder
                                    platform={platform}
                                    setNewFolderPlatform={setNewFolderPlatform}
                                    onRefresh={fetchFolders}
                                />
                            )}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default FolderList;
