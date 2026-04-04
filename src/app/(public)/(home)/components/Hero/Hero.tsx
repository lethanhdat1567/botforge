import LiveSection from "@/app/(public)/(home)/components/Hero/components/LiveSection/LiveSection";
import MoreButtons from "@/app/(public)/(home)/components/Hero/components/MoreButtons/MoreButtons";
import LoopSection from "@/app/(public)/(home)/components/Hero/components/LoopSection/LoopSection";
import AnimatedContent from "@/components/AnimatedContent";

function Hero() {
    return (
        <div className="bg-background relative flex min-h-screen w-full max-w-[100vw] flex-col items-center justify-center px-4 pt-24 text-center sm:pt-30">
            <AnimatedContent>
                <LiveSection />
            </AnimatedContent>

            <AnimatedContent delay={0.2}>
                <h1 className="mt-8 w-full max-w-2xl text-3xl font-bold sm:mt-10 sm:text-4xl md:text-5xl lg:text-6xl">
                    Tự động hóa hội thoại thông minh
                </h1>
            </AnimatedContent>
            <AnimatedContent delay={0.4}>
                <h3 className="text-md text-muted-foreground mt-4 w-full max-w-lg font-medium sm:mt-6">
                    Xây dựng kịch bản chatbot không cần code. Tối ưu quy trình
                    chăm sóc khách hàng trên một nền tảng tập trung.
                </h3>
            </AnimatedContent>
            <MoreButtons />
            <LoopSection />
        </div>
    );
}

export default Hero;
