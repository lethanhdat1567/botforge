import { images } from "@/assets/images";
import { platformNames } from "@/layouts/dragdrop/DragdropSidebar/components/FolderList/data";
import Image from "next/image";

function PlatformFolder({
    platform,
}: {
    platform: "facebook" | "instagram" | "zalo";
}) {
    return (
        <div className="flex flex-1 cursor-pointer items-center gap-4">
            <div className="flex items-center gap-2">
                <Image
                    className="h-8 w-8 object-cover"
                    src={
                        images[platform as keyof typeof images] ||
                        images.fallback
                    }
                    alt={platform}
                />
                <h3 className="truncate text-sm font-medium">
                    {platformNames[platform] || platform}
                </h3>
            </div>
        </div>
    );
}

export default PlatformFolder;
