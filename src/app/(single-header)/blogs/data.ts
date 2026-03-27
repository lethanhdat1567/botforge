export interface Article {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    category: "Get Started" | "How-to Guides" | "Tech News" | "Flow Sharing";
    author: string;
    date: string;
    readTime: number;
    thumbnail: string;
}

export const ARTICLES: Article[] = [
    {
        id: "1",
        title: "Bắt đầu với Botforge: Xây dựng Bot đầu tiên trong 5 phút",
        excerpt:
            "Hướng dẫn chi tiết từng bước để kết nối Fanpage và tạo luồng trả lời tự động cơ bản.",
        content: `# Chào mừng bạn đến với Botforge

Botforge giúp bạn tự động hóa hội thoại trên Messenger một cách thông minh.

## Các bước chuẩn bị
1. Truy cập Dashboard.
2. Nhấn "Connect Page".
3. Cấp quyền cho Botforge truy cập tin nhắn.

## Tạo Flow đầu tiên
Sử dụng JSON engine để định nghĩa các node. Mỗi node đại diện cho một câu trả lời của Bot.

\`\`\`json
{
  "id": "welcome_node",
  "type": "text",
  "content": "Chào mừng bạn đã đến với Botforge!"
}
\`\`\`

Chúc bạn thành công!`,
        category: "Get Started",
        author: "Đạt Lê",
        date: "2026-03-20",
        readTime: 3,
        thumbnail: "bg-gradient-to-br from-blue-500 to-cyan-400",
    },
    {
        id: "2",
        title: "Cách xử lý biến và điều kiện trong JSON Flow",
        excerpt:
            "Nâng cao khả năng của Bot bằng cách sử dụng logic điều kiện và lưu trữ thông tin người dùng.",
        content: `# Logic điều kiện nâng cao

Để Bot trở nên thông minh hơn, bạn cần sử dụng các node điều kiện (Condition Nodes).

## Ví dụ về Check đơn hàng
Nếu khách hàng nhập mã đơn hàng, Bot sẽ kiểm tra trạng thái API.

\`\`\`json
{
  "type": "condition",
  "variable": "order_status",
  "operator": "equals",
  "value": "shipping",
  "onTrue": "node_notify_shipping",
  "onFalse": "node_ask_support"
}
\`\`\`

Việc tách nhỏ các flow giúp hệ thống dễ bảo trì hơn.`,
        category: "How-to Guides",
        author: "Tech Team",
        date: "2026-03-22",
        readTime: 7,
        thumbnail: "bg-gradient-to-br from-purple-500 to-pink-500",
    },
    {
        id: "3",
        title: "Chia sẻ Flow: Mẫu Bot đặt lịch hẹn nha khoa",
        excerpt:
            "Một cấu trúc Flow hoàn chỉnh cho dịch vụ đặt lịch, bao gồm lấy SĐT và lưu vào Google Sheets.",
        content: `# Flow mẫu: Đặt lịch nha khoa

Đây là flow được cộng đồng chia sẻ nhiều nhất tuần qua. 

## Cấu trúc Flow
- **Node 1**: Chào mừng & Giới thiệu dịch vụ.
- **Node 2**: Chọn ngày/giờ (Sử dụng Quick Replies).
- **Node 3**: Thu thập số điện thoại.
- **Node 4**: Gửi Webhook về hệ thống quản lý.

Bạn có thể copy đoạn JSON dưới đây vào editor của mình:

\`\`\`json
{
  "flow_name": "Dental Booking",
  "nodes": [...],
  "triggers": ["đặt lịch", "tư vấn"]
}
\`\`\``,
        category: "Flow Sharing",
        author: "Phát Nguyễn",
        date: "2026-03-24",
        readTime: 5,
        thumbnail: "bg-gradient-to-br from-orange-400 to-red-500",
    },
    {
        id: "4",
        title: "Cập nhật Botforge v2.1: Hỗ trợ AI Agent",
        excerpt:
            "Điểm qua các tính năng mới nhất vừa được cập nhật trong phiên bản tháng 3.",
        content: `# Bản cập nhật tháng 3/2026

Chúng tôi vừa ra mắt tính năng tích hợp AI Agent trực tiếp vào Flow.

## Có gì mới?
- **AI Node**: Cho phép tích hợp Gemini/OpenAI vào luồng chat.
- **Improved UI**: Kéo thả node mượt mà hơn trên Antigravity.
- **API Speed**: Tốc độ xử lý Webhook nhanh hơn 30%.

Hãy thử ngay tại mục Cấu hình hệ thống.`,
        category: "Tech News",
        author: "Admin",
        date: "2026-03-26",
        readTime: 4,
        thumbnail: "bg-gradient-to-br from-green-400 to-emerald-600",
    },
];
