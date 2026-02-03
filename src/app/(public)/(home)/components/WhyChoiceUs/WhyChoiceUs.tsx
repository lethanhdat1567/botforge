import WhyChoiceUsItem from "@/app/(public)/(home)/components/WhyChoiceUs/WhyChoiceUsItem";
import { images } from "@/assets/images";
import Image from "next/image";

function WhyChoiceUs() {
    return (
        <div className="mx-auto flex w-5xl flex-col items-center pt-30">
            <h1 className="w-xl text-center text-5xl font-medium">
                Your Growth Command Center
            </h1>
            <p className="mt-4 w-md text-center">
                Clarity, momentum, and trust — everything you need to scale
                faster without friction.
            </p>

            <div className="mt-10 h-130 w-full overflow-hidden rounded-xl border border-white shadow-2xl">
                <Image
                    width={1000}
                    height={1000}
                    src={images.fallback}
                    className="h-full w-full object-cover"
                    alt="Botforge"
                />
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4">
                <WhyChoiceUsItem />
                <WhyChoiceUsItem />
                <WhyChoiceUsItem />
            </div>
        </div>
    );
}

export default WhyChoiceUs;
