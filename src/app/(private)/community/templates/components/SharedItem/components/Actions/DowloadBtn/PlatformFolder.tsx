import { images } from "@/assets/images";
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
            </div>
        </div>
    );
}

export default PlatformFolder;
