import { images } from "@/assets/images";
import Image from "next/image";

function ProblemItem() {
    return (
        <div className="overflow-hidden rounded-xl border border-white shadow-2xl">
            <Image
                alt="fallback"
                src={images.fallback}
                width={100}
                height={100}
                className="h-60 w-full object-cover"
            />
            <div className="px-8 py-4">
                <h3 className="text-xl font-semibold">Too Many Tools</h3>
                <p className="text-md mt-2 text-neutral-600">
                    Switching apps kills focus and slows your team.
                </p>
            </div>
        </div>
    );
}

export default ProblemItem;
