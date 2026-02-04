"use client";

import { techLogos } from "@/app/(public)/(home)/components/Hero/components/LoopSection/data";
import LogoLoop from "@/components/LogoLoop";

function Technology() {
    return (
        <div className="mt-30">
            <h2 className="mx-auto w-xl text-center text-5xl font-medium">
                Xây dựng trên nền tảng công nghệ hiện đại
            </h2>
            <p className="mx-auto mt-5 w-lg text-center">
                Botforge được phát triển bằng các công nghệ web hàng đầu, đảm
                bảo hiệu năng, khả năng mở rộng và trải nghiệm mượt mà cho hệ
                thống chatbot tự động.
            </p>
            <div className="mt-10">
                <LogoLoop
                    logos={techLogos}
                    speed={50}
                    direction="left"
                    logoHeight={40}
                    gap={60}
                    hoverSpeed={0}
                    scaleOnHover
                    fadeOut
                    fadeOutColor="#ffffff"
                    ariaLabel="Technology partners"
                />
            </div>
        </div>
    );
}

export default Technology;
