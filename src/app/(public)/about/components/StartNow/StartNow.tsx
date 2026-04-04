"use client";

import Galaxy from "@/components/Galaxy";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

function StartNow() {
    return (
        <div className="bg-muted mt-20 py-12 sm:mt-30 sm:py-20">
            <div className="relative mx-4 min-h-80 w-auto max-w-6xl overflow-hidden rounded-2xl sm:mx-auto sm:w-full sm:min-h-96 md:h-100">
                <div className="relative z-50 flex h-full min-h-[inherit] w-full flex-col items-center justify-center px-4 py-12 text-center text-white sm:py-16 md:py-0">
                    <h3 className="text-2xl font-medium sm:text-3xl md:text-4xl lg:text-5xl">
                        Bắt đầu tạo chatbot của bạn
                    </h3>
                    <p className="text-md mt-4 w-full max-w-xl text-center sm:mt-8">
                        Tự động trả lời tin nhắn, xây dựng flow kéo thả và theo
                        dõi hành trình khách hàng — tất cả trong một nền tảng,
                        hoàn toàn miễn phí.
                    </p>
                    <Link href="/login">
                        <Button className="mt-6 px-5!" variant={"secondary"}>
                            Tạo chatbot ngay <ChevronRight />
                        </Button>
                    </Link>
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
