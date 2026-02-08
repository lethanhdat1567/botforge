import { PROBLEMS } from "@/app/(public)/(home)/components/Problem/data";
import ProblemItem from "@/app/(public)/(home)/components/Problem/ProblemItem";
import AnimatedContent from "@/components/AnimatedContent";
import FadeContent from "@/components/FadeContent";
import SplitText from "@/components/SplitText";

function Problem() {
    return (
        <div className="mx-auto flex w-5xl flex-col items-center pt-30">
            <SplitText
                text="Trả lời tin nhắn thủ công đang làm bạn kiệt sức?"
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
                    Khi khách hàng nhắn ngày càng nhiều, việc trả lời tay khiến
                    bạn chậm phản hồi, bỏ lỡ cơ hội và không thể hoạt động 24/7.
                </p>
            </FadeContent>

            {/* List */}
            <div className="mt-8 grid grid-cols-3 gap-4">
                {PROBLEMS.map((item, index) => (
                    <ProblemItem
                        key={index}
                        index={index}
                        title={item.title}
                        description={item.description}
                        image={item.image}
                    />
                ))}
            </div>
            {/* Footer */}
            <AnimatedContent className="text-md mt-10 w-full rounded-lg border border-white bg-neutral-100 py-6 text-center shadow-2xl">
                <p className="mx-auto w-xl">
                    Khi không có chatbot, bạn đang trả giá bằng thời gian, cơ
                    hội bán hàng và trải nghiệm khách hàng.
                </p>
            </AnimatedContent>
        </div>
    );
}

export default Problem;
