import { PROBLEMS } from "@/app/(public)/(home)/components/Problem/data";
import ProblemItem from "@/app/(public)/(home)/components/Problem/ProblemItem";

function Problem() {
    return (
        <div className="mx-auto flex w-5xl flex-col items-center pt-30">
            <h1 className="w-xl text-center text-5xl font-medium">
                Trả lời tin nhắn thủ công đang làm bạn kiệt sức?
            </h1>
            <p className="mt-6 w-lg text-center">
                Khi khách hàng nhắn ngày càng nhiều, việc trả lời tay khiến bạn
                chậm phản hồi, bỏ lỡ cơ hội và không thể hoạt động 24/7.
            </p>

            {/* List */}
            <div className="mt-8 grid grid-cols-3 gap-4">
                {PROBLEMS.map((item, index) => (
                    <ProblemItem
                        key={index}
                        title={item.title}
                        description={item.description}
                        image={item.image}
                    />
                ))}
            </div>
            {/* Footer */}
            <div className="text-md mt-10 w-full rounded-lg border border-white bg-neutral-100 py-6 text-center shadow-2xl">
                <p className="mx-auto w-xl">
                    Khi không có chatbot, bạn đang trả giá bằng thời gian, cơ
                    hội bán hàng và trải nghiệm khách hàng.
                </p>
            </div>
        </div>
    );
}

export default Problem;
