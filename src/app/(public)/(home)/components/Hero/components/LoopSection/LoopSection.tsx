import { techLogos } from "@/app/(public)/(home)/components/Hero/components/LoopSection/data";
import FadeContent from "@/components/FadeContent";
import LogoLoop from "@/components/LogoLoop";

function LoopSection() {
    return (
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
            <div className="mx-auto mt-14 w-[50vw]">
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
                    fadeOutColor="#ffffff"
                    ariaLabel="Technology partners"
                />
            </div>
        </FadeContent>
    );
}

export default LoopSection;
