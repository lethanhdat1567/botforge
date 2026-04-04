import { PROBLEMS } from "@/app/(public)/(home)/components/Problem/data";
import ProblemItem from "@/app/(public)/(home)/components/Problem/ProblemItem";
import AnimatedContent from "@/components/AnimatedContent";
import FadeContent from "@/components/FadeContent";
import SplitText from "@/components/SplitText";

function Problem() {
    return (
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center px-4 pt-20 sm:px-6 sm:pt-30">
            <SplitText
                text="Trả lời tin nhắn thủ công đang làm bạn kiệt sức?"
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
                    Khi khách hàng nhắn ngày càng nhiều, việc trả lời tay khiến
                    bạn chậm phản hồi, bỏ lỡ cơ hội và không thể hoạt động 24/7.
                </p>
            </FadeContent>

            {/* List */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
            <AnimatedContent className="text-md mt-10 w-full rounded-lg border border-border bg-muted px-3 py-6 text-center shadow-2xl sm:px-6">
                <p className="mx-auto w-full max-w-xl">
                    Khi không có chatbot, bạn đang trả giá bằng thời gian, cơ
                    hội bán hàng và trải nghiệm khách hàng.
                </p>
            </AnimatedContent>
        </div>
    );
}

export default Problem;
