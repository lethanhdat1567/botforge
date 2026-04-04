"use client";

import { techLogos } from "@/app/(public)/(home)/components/Hero/components/LoopSection/data";
import LogoLoop from "@/components/LogoLoop";

function Technology() {
    return (
        <div className="mt-20 sm:mt-30">
            <h2 className="mx-auto w-full max-w-xl px-2 text-center text-3xl font-medium sm:px-0 sm:text-4xl md:text-5xl">
                Xây dựng trên nền tảng công nghệ hiện đại
            </h2>
            <p className="mx-auto mt-5 w-full max-w-lg px-2 text-center text-muted-foreground sm:px-0">
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
                    ariaLabel="Technology partners"
                />
            </div>
        </div>
    );
}

export default Technology;
