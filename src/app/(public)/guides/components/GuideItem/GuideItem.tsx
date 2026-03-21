import { images } from "@/assets/images";
import { resolveMediaSrc } from "@/lib/image";
import { GuidePayload } from "@/services/guideService";
import Image from "next/image";
import Link from "next/link";

function GuideItem({ guide }: { guide: GuidePayload }) {
    return (
        <Link href={`/guides/${guide.slug}`}>
            <div className="group/guide relative cursor-pointer rounded-lg p-3 shadow-[0_10px_16px_0px_rgba(0,0,0,0.2)]">
                <div className="h-60 w-full overflow-hidden rounded-lg">
                    <Image
                        src={resolveMediaSrc(guide.thumbnail as any)}
                        width={500}
                        height={500}
                        alt="fallback"
                        className="h-full w-full object-cover transition duration-300 ease-out group-hover/guide:scale-105 group-hover/guide:opacity-80"
                    />
                </div>
                <h2 className="mt-4 line-clamp-2 text-xl font-medium">
                    {guide.title}
                </h2>

                <p className="mt-2 line-clamp-3 text-sm text-neutral-600">
                    {guide.summary}
                </p>
            </div>
        </Link>
    );
}

export default GuideItem;
