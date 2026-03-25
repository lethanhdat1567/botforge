export const MOCK_FLOW_SHARES = [
    {
        id: "16ce22ec-7c1b-45d8-8fa8-816c60abc3ee",
        flowId: "9537aba3-80c7-4de9-9f2a-00b92925b42c",
        name: "Hệ thống Tự động Chăm sóc Khách hàng Bất động sản",
        description:
            "Quy trình tự động phân loại khách hàng tiềm năng, gửi bảng giá qua Messenger và đặt lịch hẹn tư vấn trực tiếp.",
        thumbnail:
            "https://images.unsplash.com/photo-1560514447-9887d1b30300?q=80&w=1000&auto=format&fit=crop",
        status: "active",
        createdAt: "2026-03-24T11:28:23.033Z",
        updatedAt: "2026-03-24T11:28:23.033Z",
        flow: {
            id: "9537aba3-80c7-4de9-9f2a-00b92925b42c",
            name: "Bất động sản Pro",
        },
        flowShareCategory: [
            { id: "cat-1", name: "Bất động sản" },
            { id: "cat-2", name: "Automation" },
        ],
        _count: {
            flowShareLikes: 145,
            flowShareComments: 23,
            flowShareDowloads: 890,
        },
    },
    {
        id: "2a3b4c5d-6e7f-8g9h-0i1j-k2l3m4n5o6p7",
        flowId: "flow-002",
        name: "Bot Bán Hàng E-commerce Đa Kênh",
        description:
            "Tích hợp quản lý đơn hàng, kiểm tra tồn kho và thanh toán VNPAY ngay trong chatbot.",
        thumbnail:
            "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?q=80&w=1000&auto=format&fit=crop",
        status: "active",
        createdAt: "2026-03-20T08:15:00.000Z",
        updatedAt: "2026-03-21T10:00:00.000Z",
        flow: {
            id: "flow-002",
            name: "E-com Engine",
        },
        flowShareCategory: [{ id: "cat-3", name: "Thương mại điện tử" }],
        _count: {
            flowShareLikes: 320,
            flowShareComments: 56,
            flowShareDowloads: 2150,
        },
    },
    {
        id: "3b4c5d6e-7f8g-9h0i-1j2k-l3m4n5o6p7q8",
        flowId: "flow-003",
        name: "Kịch bản Quiz Thu thập Lead Giáo dục",
        description:
            "Tạo bài trắc nghiệm tính cách để tư vấn khóa học phù hợp. Tỷ lệ chuyển đổi cao cho các trung tâm tiếng Anh.",
        thumbnail: null, // Test trường hợp không có ảnh
        status: "active",
        createdAt: "2026-03-15T14:30:00.000Z",
        updatedAt: "2026-03-15T14:30:00.000Z",
        flow: {
            id: "flow-003",
            name: "Education Quiz",
        },
        flowShareCategory: [], // Test trường hợp không có category
        _count: {
            flowShareLikes: 42,
            flowShareComments: 5,
            flowShareDowloads: 120,
        },
    },
    {
        id: "4c5d6e7f-8g9h-0i1j-k2l3-m4n5o6p7q8r9",
        flowId: "flow-004",
        name: "AI Support Assistant (OpenAI Integration)",
        description:
            "Kết nối kịch bản với ChatGPT để trả lời mọi thắc mắc của khách hàng dựa trên dữ liệu training có sẵn.",
        thumbnail:
            "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop",
        status: "active",
        createdAt: "2026-03-25T09:00:00.000Z",
        updatedAt: "2026-03-25T09:00:00.000Z",
        flow: {
            id: "flow-004",
            name: "AI Core",
        },
        flowShareCategory: [
            { id: "cat-4", name: "Trí tuệ nhân tạo" },
            { id: "cat-5", name: "CSKH" },
        ],
        _count: {
            flowShareLikes: 567,
            flowShareComments: 89,
            flowShareDowloads: 3400,
        },
    },
];
