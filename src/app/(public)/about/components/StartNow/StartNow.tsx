"use client";

import Galaxy from "@/components/Galaxy";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

function StartNow() {
    return (
        <div className="mt-30 bg-[#f6f6f6] py-20">
            <div className="relative mx-auto h-100 w-6xl overflow-hidden rounded-2xl">
                <div className="relative z-50 flex h-full w-full flex-col items-center justify-center text-white">
                    <h3 className="text-5xl font-medium">
                        Bắt đầu tạo chatbot của bạn
                    </h3>
                    <p className="text-md mt-8 w-xl text-center">
                        Tự động trả lời tin nhắn, xây dựng flow kéo thả và theo
                        dõi hành trình khách hàng — tất cả trong một nền tảng,
                        hoàn toàn miễn phí.
                    </p>
                    <Button className="mt-6 px-5!" variant={"secondary"}>
                        Tạo chatbot ngay <ChevronRight />
                    </Button>
                </div>
                <div className="absolute inset-0 bg-black">
                    <Galaxy
                        density={0.6}
                        glowIntensity={0.3}
                        saturation={0}
                        hueShift={100}
                        twinkleIntensity={0.3}
                        rotationSpeed={0.1}
                        repulsionStrength={2}
                        autoCenterRepulsion={0}
                        starSpeed={0.2}
                        speed={0.1}
                    />
                </div>
            </div>
        </div>
    );
}

export default StartNow;
