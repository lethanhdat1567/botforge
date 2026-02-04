import { Mail, LifeBuoy, MessageSquare, Lightbulb } from "lucide-react";

const CONTACT_ITEMS = [
    {
        icon: Mail,
        title: "Liên hệ trực tiếp",
        description:
            "Gửi email cho chúng tôi nếu bạn có câu hỏi hoặc cần hỗ trợ chi tiết.",
        linkText: "hello@Botforge.com",
    },
    {
        icon: LifeBuoy,
        title: "Hỗ trợ kỹ thuật",
        description:
            "Gặp vấn đề với chatbot hoặc flow? Đội ngũ kỹ thuật luôn sẵn sàng giúp bạn.",
        linkText: "Trung tâm hỗ trợ",
    },
    {
        icon: MessageSquare,
        title: "Góp ý sản phẩm",
        description:
            "Chia sẻ ý tưởng hoặc đề xuất tính năng mới để Botforge ngày càng tốt hơn.",
        linkText: "Gửi góp ý",
    },
    {
        icon: Lightbulb,
        title: "Hợp tác & tích hợp",
        description: "Bạn muốn tích hợp hoặc hợp tác phát triển cùng Botforge?",
        linkText: "Liên hệ hợp tác",
    },
];

export default CONTACT_ITEMS;
