import LiveSection from "@/app/(public)/(home)/components/Hero/components/LiveSection/LiveSection";
import MoreButtons from "@/app/(public)/(home)/components/Hero/components/MoreButtons/MoreButtons";
import LoopSection from "@/app/(public)/(home)/components/Hero/components/LoopSection/LoopSection";

function Hero() {
    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center pt-30 text-center">
            <LiveSection />
            <h1 className="mt-10 w-2xl text-6xl font-bold">
                The New Era AI Command Center
            </h1>
            <h3 className="text-md mt-6 w-md font-medium text-neutral-700">
                Plan, launch and scale — in one glass-clear dashboard for modern
                founders.
            </h3>
            <MoreButtons />
            <LoopSection />
        </div>
    );
}

export default Hero;
