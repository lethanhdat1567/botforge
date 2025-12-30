import { ShimmeringText } from "@/components/animate-ui/primitives/texts/shimmering";
import LightPillar from "@/components/LightPillar";
import { Bot, Rocket, Usb } from "lucide-react";

function Hero() {
    return (
        <div className="relative flex h-screen items-center overflow-hidden">
            <div className="app-container relative z-10 pt-(--header-h)">
                <div className="mb-10 inline-flex items-center gap-2 text-lg text-neutral-400">
                    <Bot size={30} />
                    <ShimmeringText text="Forge your Bot – Build AI your way" />
                </div>

                <h1 className="max-w-5xl text-7xl leading-24 font-bold uppercase">
                    Trải nghiệm Chatbot AI thế hệ mới
                </h1>

                <p className="text-md mt-9 mb-12 max-w-2xl text-xl text-neutral-300">
                    BotForge giúp bạn xây chatbot kéo-thả dễ dàng, hỗ trợ
                    livechat 24/7, phân tích dữ liệu khách hàng chi tiết, tăng
                    doanh thu và tiết kiệm thời gian vận hành.
                </p>

                <div className="flex items-center gap-4">
                    <button className="group flex cursor-pointer items-center gap-2 rounded-full bg-(--primary-color) px-6 py-3 text-lg transition hover:opacity-70">
                        <Rocket
                            size={20}
                            className="transition group-hover:translate-x-1 group-hover:-translate-y-1"
                        />
                        Bắt đầu miễn phí
                    </button>
                    <button className="group flex cursor-pointer items-center gap-2 rounded-full border-2 bg-black px-6 py-3 text-lg transition hover:opacity-70">
                        <Usb
                            size={20}
                            className="transition group-hover:translate-x-1 group-hover:-translate-y-1"
                        />
                        Xem Demo
                    </button>
                </div>
            </div>

            {/* LightPillar overlay layer */}
            <div className="pointer-events-none fixed top-0 left-0 -z-10 h-screen w-full will-change-transform">
                <LightPillar
                    topColor="#050505"
                    bottomColor="#f05cb5"
                    intensity={0.6}
                    rotationSpeed={0.4}
                    glowAmount={0.005}
                    pillarWidth={5.0}
                    pillarHeight={0.5}
                    noiseIntensity={1}
                    pillarRotation={40}
                    interactive={false}
                    mixBlendMode="normal"
                />
            </div>
        </div>
    );
}

export default Hero;
