import Link from "next/link";

function Navbar() {
    const columns = [
        {
            title: "Sản phẩm",
            items: [
                { label: "Chatbot tự động", link: "/product/chatbot" },
                { label: "Flow kéo thả", link: "/product/flow-builder" },
                { label: "Theo dõi hội thoại", link: "/product/analytics" },
                { label: "Template có sẵn", link: "/templates" },
            ],
        },
        {
            title: "Tài nguyên",
            items: [
                { label: "Hướng dẫn sử dụng", link: "/guides" },
                { label: "Câu hỏi thường gặp", link: "/faq" },
                { label: "Mẹo tối ưu chatbot", link: "/blog" },
                { label: "Cộng đồng người dùng", link: "/community" },
            ],
        },
        {
            title: "Hỗ trợ",
            items: [
                { label: "Liên hệ hỗ trợ", link: "/contact" },
                { label: "Báo lỗi / Góp ý", link: "/feedback" },
                { label: "Chính sách bảo mật", link: "/privacy-policy" },
                { label: "Điều khoản sử dụng", link: "/terms" },
            ],
        },
    ];

    return (
        <div className="col-span-8 grid grid-cols-3 gap-8">
            {columns.map((col) => (
                <div key={col.title}>
                    <h3 className="text-md mb-4 font-medium">{col.title}</h3>
                    <ul className="space-y-2">
                        {col.items.map((item) => (
                            <li key={item.label}>
                                <Link
                                    href={item.link as any}
                                    className="text-sm text-neutral-400 hover:underline"
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default Navbar;
