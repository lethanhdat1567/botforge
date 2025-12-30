import React from "react";
import {
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    Mail,
    Send,
} from "lucide-react";

const PublicFooter = () => {
    return (
        <footer className="relative w-full overflow-hidden border-t border-gray-900 bg-black font-sans text-gray-300">
            {/* Background Glow Effect (Để đồng bộ với Header) */}
            <div className="pointer-events-none absolute bottom-0 left-1/4 h-75 w-125 rounded-full bg-pink-900/20 blur-[120px]" />

            <div className="app-container relative z-10 container mx-auto pt-16 pb-8">
                {/* Top Section: Grid Layout */}
                <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
                    {/* Column 1: Brand & Info */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 select-none">
                            <span className="text-2xl font-bold text-white">
                                Bot
                            </span>
                            <span className="text-2xl font-bold text-pink-500">
                                Forge
                            </span>
                        </div>
                        <p className="text-sm leading-relaxed text-gray-400">
                            Nền tảng xây dựng Chatbot AI thế hệ mới. Tự động hóa
                            quy trình chăm sóc khách hàng và tăng trưởng doanh
                            thu vượt bậc.
                        </p>
                        <div className="flex gap-4">
                            <SocialIcon icon={<Facebook size={20} />} />
                            <SocialIcon icon={<Twitter size={20} />} />
                            <SocialIcon icon={<Linkedin size={20} />} />
                            <SocialIcon icon={<Instagram size={20} />} />
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h3 className="mb-6 text-lg font-bold text-white">
                            Sản phẩm
                        </h3>
                        <ul className="space-y-4 text-sm">
                            <FooterLink>Tính năng</FooterLink>
                            <FooterLink>Tích hợp</FooterLink>
                            <FooterLink>Bảng giá</FooterLink>
                            <FooterLink>Live Demo</FooterLink>
                            <FooterLink>Roadmap</FooterLink>
                        </ul>
                    </div>

                    {/* Column 3: Resources */}
                    <div>
                        <h3 className="mb-6 text-lg font-bold text-white">
                            Tài nguyên
                        </h3>
                        <ul className="space-y-4 text-sm">
                            <FooterLink>Tài liệu hướng dẫn</FooterLink>
                            <FooterLink>API Reference</FooterLink>
                            <FooterLink>Blog công nghệ</FooterLink>
                            <FooterLink>Cộng đồng</FooterLink>
                            <FooterLink>Help Center</FooterLink>
                        </ul>
                    </div>

                    {/* Column 4: Newsletter */}
                    <div>
                        <h3 className="mb-6 text-lg font-bold text-white">
                            Đăng ký nhận tin
                        </h3>
                        <p className="mb-4 text-sm text-gray-400">
                            Nhận những cập nhật mới nhất về tính năng và ưu đãi
                            từ BotForge.
                        </p>
                        <div className="relative">
                            <input
                                type="email"
                                placeholder="Email của bạn..."
                                className="w-full rounded-lg border border-gray-800 bg-gray-900 px-4 py-3 text-sm text-white transition-all placeholder:text-gray-600 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 focus:outline-none"
                            />
                            <button className="absolute top-1.5 right-1.5 rounded-md bg-pink-600 p-1.5 text-white transition-colors hover:bg-pink-700">
                                <Send size={16} />
                            </button>
                        </div>
                        <div className="mt-6 flex items-center gap-2 text-sm text-gray-500">
                            <Mail size={16} />
                            <span>contact@botforge.io</span>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="my-8 border-t border-gray-900" />

                {/* Bottom Section: Copyright & Legal */}
                <div className="flex flex-col items-center justify-between gap-4 text-xs text-gray-500 md:flex-row">
                    <div>
                        &copy; {new Date().getFullYear()} BotForge AI. All
                        rights reserved.
                    </div>
                    <div className="flex gap-8">
                        <a
                            href="#"
                            className="transition-colors hover:text-pink-500"
                        >
                            Điều khoản sử dụng
                        </a>
                        <a
                            href="#"
                            className="transition-colors hover:text-pink-500"
                        >
                            Chính sách bảo mật
                        </a>
                        <a
                            href="#"
                            className="transition-colors hover:text-pink-500"
                        >
                            Cookie Policy
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

// Sub-components nhỏ để code gọn hơn
const FooterLink = ({ children }) => (
    <li>
        <a
            href="#"
            className="inline-block text-gray-400 transition-all duration-200 hover:translate-x-1 hover:text-pink-500"
        >
            {children}
        </a>
    </li>
);

const SocialIcon = ({ icon }) => (
    <a
        href="#"
        className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-gray-400 transition-all duration-300 hover:-translate-y-1 hover:bg-pink-600 hover:text-white"
    >
        {icon}
    </a>
);

export default PublicFooter;
