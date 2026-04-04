import { images } from "@/assets/images";
import AnimatedContent from "@/components/AnimatedContent";
import SplitText from "@/components/SplitText";
import Image from "next/image";

function FounderSection() {
    return (
        <div className="grid grid-cols-1 gap-10 md:gap-16 lg:grid-cols-2 lg:gap-20">
            <div>
                <SplitText
                    text="Từ những ý tưởng đầu tiên"
                    tag="h1"
                    className="text-2xl font-semibold sm:text-3xl md:text-4xl"
                    duration={1}
                />
                <AnimatedContent className="text-md text-muted-foreground mt-4">
                    <p>
                        Botforge bắt đầu từ một vấn đề rất quen thuộc: trả lời
                        tin nhắn quá nhiều, lặp đi lặp lại mỗi ngày, nhưng vẫn
                        không thể online 24/7. Tôi nhận ra rằng rất nhiều người
                        kinh doanh nhỏ, startup và cá nhân đang tốn thời gian
                        cho những việc hoàn toàn có thể tự động hóa.
                    </p>
                    <p className="text-muted-foreground mt-4">
                        Tôi xây dựng Botforge với một mục tiêu rõ ràng: giúp mọi
                        người tạo chatbot một cách đơn giản nhất — không cần lập
                        trình, chỉ cần kéo thả, theo dõi được hành trình hội
                        thoại và hiểu khách hàng đang dừng lại ở đâu.
                    </p>
                    <p className="text-muted-foreground mt-4">
                        Đây không phải là một sản phẩm được sinh ra từ phòng họp
                        hay bản kế hoạch phức tạp, mà từ nhu cầu thực tế trong
                        quá trình làm việc mỗi ngày. Botforge sẽ tiếp tục được
                        cải thiện dựa trên phản hồi của người dùng, từng chút
                        một, để trở thành công cụ thực sự hữu ích.
                    </p>
                </AnimatedContent>
                <AnimatedContent className="mt-6 flex flex-col gap-1">
                    <span className="font-medium">Lê Thành Đạt</span>
                    <span>Founder & Builder</span>
                </AnimatedContent>
            </div>
            <AnimatedContent direction="horizontal">
                <Image
                    alt="Le Thanh Dat"
                    src={images.avatar}
                    width={600}
                    height={600}
                    className="mx-auto h-auto max-h-96 w-full max-w-md rounded-md object-cover lg:ml-auto lg:h-120 lg:max-h-none lg:w-[90%] lg:max-w-none"
                />
            </AnimatedContent>
        </div>
    );
}

export default FounderSection;
