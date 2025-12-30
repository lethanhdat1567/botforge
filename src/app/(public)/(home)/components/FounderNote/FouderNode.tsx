import { images } from "@/assets/images";
import Image from "next/image";

function FounderNote() {
    return (
        <div className="bg-[#0e0d0d] pt-30">
            <div className="app-container text-center">
                <h2 className="mb-10 text-4xl font-bold">Featured Jobs</h2>
                <div className="mx-auto px-40 text-center text-3xl font-medium text-neutral-400">
                    &quot;We harness your data, understand your audience, and
                    use AI to help your brand rise above the noise. The best
                    part? We execute, too.&quot;
                </div>
                <div className="my-8 flex items-center justify-center gap-4 text-lg font-medium">
                    <Image
                        alt="Le Thanh Dat"
                        src={images.avatar}
                        className="h-12 w-12 rounded-full border-3 object-cover"
                    />
                    Founder of Botforge
                </div>
                <div className="mx-auto overflow-hidden rounded-xl shadow-white/80">
                    <Image
                        src={images.fallback}
                        alt="fallback"
                        className="h-150 w-full object-cover"
                    />
                </div>
            </div>
        </div>
    );
}

export default FounderNote;
