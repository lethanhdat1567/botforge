import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
    AccordionHeader,
} from "@/components/animate-ui/primitives/radix/accordion";
import AnimatedContent from "@/components/AnimatedContent";
import SplitText from "@/components/SplitText";
import { Plus } from "lucide-react";

function Questions() {
    const ITEMS = [
        {
            title: "Chatbot này dùng để làm gì?",
            content:
                "Nền tảng giúp bạn tự động trả lời tin nhắn trên Facebook, website và các kênh khác. Chatbot có thể xử lý các câu hỏi lặp lại, tư vấn cơ bản, thu thông tin khách hàng và chuyển hội thoại cho nhân viên khi cần — giúp bạn tiết kiệm thời gian và không bỏ lỡ khách hàng.",
        },
        {
            title: "Tôi có cần biết lập trình không?",
            content:
                "Không cần. Bạn chỉ việc kéo thả các khối để tạo luồng hội thoại theo ý muốn. Mọi thao tác đều trực quan, dễ hiểu và có thể sử dụng ngay cả khi bạn không có nền tảng kỹ thuật.",
        },
        {
            title: "Tôi có thể tạo những loại flow nào?",
            content:
                "Bạn có thể xây dựng nhiều loại flow khác nhau như: chào hỏi khách hàng, trả lời câu hỏi thường gặp, tư vấn sản phẩm, thu thông tin liên hệ, phân loại nhu cầu hoặc chuyển cuộc trò chuyện sang người thật.",
        },
        {
            title: "Chatbot có hoạt động 24/7 không?",
            content:
                "Có. Chatbot luôn sẵn sàng hoạt động liên tục, phản hồi ngay khi khách gửi tin nhắn, kể cả ngoài giờ làm việc, ban đêm hoặc khi lượng tin nhắn tăng cao.",
        },
        {
            title: "Tôi có theo dõi được hiệu quả flow không?",
            content:
                "Có. Hệ thống cho phép bạn theo dõi khách hàng đang đi qua những bước nào trong flow, dừng lại ở đâu và tương tác ra sao, từ đó giúp bạn tối ưu nội dung và cải thiện hiệu quả hội thoại.",
        },
        {
            title: "Sử dụng nền tảng có mất phí không?",
            content:
                "Hiện tại bạn có thể sử dụng miễn phí để tạo và trải nghiệm chatbot đầu tiên. Các tính năng nâng cao sẽ được giới thiệu khi bạn cần mở rộng quy mô sử dụng.",
        },
    ];

    return (
        <div className="mx-auto flex w-5xl flex-col items-center pt-30">
            <SplitText
                text="Chúng tôi sẵn sàng giải đáp thắc mắc của bạn"
                tag="h1"
                className="w-xl pb-2 text-center text-5xl font-medium"
                duration={1}
            />
            <AnimatedContent className="mt-10 w-4xl">
                <Accordion type={"multiple"} className="w-full space-y-4">
                    {ITEMS.map((item, index) => (
                        <AccordionItem
                            key={index}
                            value={`item-${index + 1}`}
                            className="rounded-md border border-white bg-white px-3 py-1 shadow-[0_10px_14px_-8px_rgba(0,0,0,0.3)]"
                        >
                            <AccordionHeader>
                                <AccordionTrigger className="flex w-full cursor-pointer items-center justify-between border-b-0 py-2 text-start">
                                    {item.title}{" "}
                                    <Plus className="h-5 w-5 text-neutral-500 transition-transform duration-300" />
                                </AccordionTrigger>
                            </AccordionHeader>
                            <AccordionContent>
                                <div className="text-muted-foreground py-2 text-sm">
                                    {item.content}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </AnimatedContent>
        </div>
    );
}

export default Questions;
