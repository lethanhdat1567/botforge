import { images } from "@/assets/images";
import Image from "next/image";

function FounderSection() {
    return (
        <div className="grid grid-cols-2 gap-20">
            <div>
                <h1 className="text-4xl font-semibold">
                    Từ những ý tưởng đầu tiên
                </h1>
                <div className="mt-4 text-sm text-neutral-900">
                    <p>
                        Botforge bắt đầu từ một vấn đề rất quen thuộc: trả lời
                        tin nhắn quá nhiều, lặp đi lặp lại mỗi ngày, nhưng vẫn
                        không thể online 24/7. Tôi nhận ra rằng rất nhiều người
                        kinh doanh nhỏ, startup và cá nhân đang tốn thời gian
                        cho những việc hoàn toàn có thể tự động hóa.
                    </p>
                    <p className="mt-4 text-sm text-neutral-900">
                        Tôi xây dựng Botforge với một mục tiêu rõ ràng: giúp mọi
                        người tạo chatbot một cách đơn giản nhất — không cần lập
                        trình, chỉ cần kéo thả, theo dõi được hành trình hội
                        thoại và hiểu khách hàng đang dừng lại ở đâu.
                    </p>
                    <p className="mt-4 text-sm text-neutral-900">
                        Đây không phải là một sản phẩm được sinh ra từ phòng họp
                        hay bản kế hoạch phức tạp, mà từ nhu cầu thực tế trong
                        quá trình làm việc mỗi ngày. Botforge sẽ tiếp tục được
                        cải thiện dựa trên phản hồi của người dùng, từng chút
                        một, để trở thành công cụ thực sự hữu ích.
                    </p>
                </div>
                <div className="mt-10 flex flex-col gap-1">
                    <span className="text-sm font-medium">Lê Thành Đạt</span>
                    <span className="text-sm">Founder & Builder</span>
                </div>
            </div>
            <div>
                <Image
                    alt="Le Thanh Dat"
                    src={images.avatar}
                    width={600}
                    height={600}
                    className="ml-auto h-120 w-[90%] rounded-md object-cover"
                />
            </div>
        </div>
    );
}

export default FounderSection;
