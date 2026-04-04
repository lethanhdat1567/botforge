import { WHY_CHOICE_US_DATA } from "@/app/(public)/(home)/components/WhyChoiceUs/data";
import WhyChoiceUsItem from "@/app/(public)/(home)/components/WhyChoiceUs/WhyChoiceUsItem";
import { images } from "@/assets/images";
import AnimatedContent from "@/components/AnimatedContent";
import FadeContent from "@/components/FadeContent";
import SplitText from "@/components/SplitText";
import Image from "next/image";

function WhyChoiceUs() {
    return (
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center px-4 pt-20 sm:px-6 sm:pt-30">
            <SplitText
                text="Giải quyết triệt để bài toán chăm sóc khách hàng"
                tag="h1"
                className="w-full max-w-xl pb-2 text-center text-3xl font-medium sm:text-4xl md:text-5xl"
                duration={1}
            />
            <FadeContent
                blur={true}
                duration={1000}
                initialOpacity={0}
                delay={500}
            >
                <p className="mt-6 w-full max-w-lg text-center">
                    Thiết kế chatbot, tự động trả lời và theo dõi hiệu quả hội
                    thoại — tất cả trong một hệ thống thống nhất.
                </p>
            </FadeContent>

            <AnimatedContent className="mt-10 h-48 w-full overflow-hidden rounded-xl border border-border shadow-2xl sm:h-72 md:h-96 lg:h-130">
                <Image
                    width={1000}
                    height={1000}
                    src={images.heroBanner}
                    className="h-full w-full object-cover"
                    alt="Botforge"
                />
            </AnimatedContent>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {WHY_CHOICE_US_DATA.map((item, index) => (
                    <WhyChoiceUsItem key={index} {...item} index={index} />
                ))}
            </div>
        </div>
    );
}

export default WhyChoiceUs;
