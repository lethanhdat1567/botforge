import { WHY_CHOICE_US_DATA } from "@/app/(public)/(home)/components/WhyChoiceUs/data";
import WhyChoiceUsItem from "@/app/(public)/(home)/components/WhyChoiceUs/WhyChoiceUsItem";
import { images } from "@/assets/images";
import Image from "next/image";

function WhyChoiceUs() {
    return (
        <div className="mx-auto flex w-5xl flex-col items-center pt-30">
            <h1 className="w-2xl text-center text-5xl font-medium">
                Giải quyết triệt để bài toán chăm sóc khách hàng
            </h1>
            <p className="mt-5 w-md text-center">
                Thiết kế chatbot, tự động trả lời và theo dõi hiệu quả hội thoại
                — tất cả trong một hệ thống thống nhất.
            </p>

            <div className="mt-10 h-130 w-full overflow-hidden rounded-xl border border-white shadow-2xl">
                <Image
                    width={1000}
                    height={1000}
                    src={images.heroBanner}
                    className="h-full w-full object-cover"
                    alt="Botforge"
                />
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4">
                {WHY_CHOICE_US_DATA.map((item, index) => (
                    <WhyChoiceUsItem key={index} {...item} />
                ))}
            </div>
        </div>
    );
}

export default WhyChoiceUs;
