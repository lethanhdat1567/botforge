import { techLogos } from "@/app/(public)/(home)/components/Hero/components/LoopSection/data";
import FadeContent from "@/components/FadeContent";
import LogoLoop from "@/components/LogoLoop";

function LoopSection() {
    return (
        <FadeContent
            blur={true}
            duration={1000}
            initialOpacity={0}
            className="w-full min-w-0 max-w-full overflow-x-hidden"
        >
            <div className="mx-auto mt-10 w-full min-w-0 max-w-3xl overflow-x-hidden px-4 sm:mt-14 sm:px-0">
                <div className="text-md mb-4 font-medium">
                    Xây dựng trên nền tảng công nghệ hiện đại
                </div>
                <LogoLoop
                    logos={techLogos}
                    pauseOnHover={false}
                    speed={50}
                    direction="left"
                    logoHeight={36}
                    gap={60}
                    fadeOut
                    ariaLabel="Technology partners"
                    className="max-w-full"
                />
            </div>
        </FadeContent>
    );
}

export default LoopSection;
