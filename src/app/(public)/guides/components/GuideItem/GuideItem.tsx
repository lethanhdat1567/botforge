import { images } from "@/assets/images";
import Image from "next/image";

function GuideItem() {
    return (
        <div className="group/guide relative cursor-pointer rounded-lg p-3 shadow-[0_10px_16px_0px_rgba(0,0,0,0.2)]">
            <div className="h-60 w-full overflow-hidden rounded-lg">
                <Image
                    src={images.avatar}
                    width={500}
                    height={500}
                    alt="fallback"
                    className="h-full w-full object-cover transition duration-300 ease-out group-hover/guide:scale-105 group-hover/guide:opacity-80"
                />
            </div>
            <h2 className="mt-4 line-clamp-2 text-xl font-medium">
                How Botforge helps founders plan and grow
            </h2>

            <p className="mt-2 line-clamp-3 text-sm text-neutral-600">
                Plan, build, and grow without chaos. Botforge gives you
                structure from day one.
            </p>

            <div className="absolute top-6 right-6 rounded-full bg-white px-4 py-1 text-xs shadow-[0_6px_12px_-4px_rgba(0,0,0,0.25),0_0_0_1px_rgba(255,255,255,0.9)]">
                Founder operating systems
            </div>
        </div>
    );
}

export default GuideItem;
