import { WHY_CHOICE_US_DATA } from "@/app/(public)/(home)/components/WhyChoiceUs/data";
import WhyChoiceUsItem from "@/app/(public)/(home)/components/WhyChoiceUs/WhyChoiceUsItem";
import { images } from "@/assets/images";
import AnimatedContent from "@/components/AnimatedContent";
import FadeContent from "@/components/FadeContent";
import SplitText from "@/components/SplitText";
import Image from "next/image";

function WhyChoiceUs() {
    return (
        <div className="mx-auto flex w-5xl flex-col items-center pt-30">
            <SplitText
                text="Giải quyết triệt để bài toán chăm sóc khách hàng"
                tag="h1"
                className="w-xl pb-2 text-center text-5xl font-medium"
                duration={1}
            />
            <FadeContent
                blur={true}
                duration={1000}
                initialOpacity={0}
                delay={500}
            >
                <p className="mt-6 w-lg text-center">
                    Thiết kế chatbot, tự động trả lời và theo dõi hiệu quả hội
                    thoại — tất cả trong một hệ thống thống nhất.
                </p>
            </FadeContent>

            <AnimatedContent className="mt-10 h-130 w-full overflow-hidden rounded-xl border border-white shadow-2xl">
                <Image
                    width={1000}
                    height={1000}
                    src={images.heroBanner}
                    className="h-full w-full object-cover"
                    alt="Botforge"
                />
            </AnimatedContent>

            <div className="mt-10 grid grid-cols-3 gap-4">
                {WHY_CHOICE_US_DATA.map((item, index) => (
                    <WhyChoiceUsItem key={index} {...item} index={index} />
                ))}
            </div>
        </div>
    );
}

export default WhyChoiceUs;
