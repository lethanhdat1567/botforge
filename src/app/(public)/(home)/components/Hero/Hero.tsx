import LiveSection from "@/app/(public)/(home)/components/Hero/components/LiveSection/LiveSection";
import MoreButtons from "@/app/(public)/(home)/components/Hero/components/MoreButtons/MoreButtons";
import LoopSection from "@/app/(public)/(home)/components/Hero/components/LoopSection/LoopSection";
import AnimatedContent from "@/components/AnimatedContent";

function Hero() {
    return (
        <div className="relative flex h-screen w-screen flex-col items-center justify-center bg-white pt-30 text-center">
            <AnimatedContent>
                <LiveSection />
            </AnimatedContent>

            <AnimatedContent delay={0.2}>
                <h1 className="mt-10 w-2xl text-6xl font-bold">
                    Nền tảng xây dựng chatbot tự động
                </h1>
            </AnimatedContent>
            <AnimatedContent delay={0.4}>
                <h3 className="text-md mt-6 w-lg font-medium text-neutral-700">
                    Thiết kế flow hội thoại bằng kéo thả, tự động trả lời tin
                    nhắn và theo dõi hiệu quả — tất cả trong một hệ thống duy
                    nhất.
                </h3>
            </AnimatedContent>
            <MoreButtons />
            <LoopSection />
        </div>
    );
}

export default Hero;
