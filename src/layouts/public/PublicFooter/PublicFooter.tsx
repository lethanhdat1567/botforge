import Logo from "@/components/Logo";
import Navbar from "@/layouts/public/PublicFooter/components/Navbar/Navbar";
import { Facebook, Github, Instagram } from "lucide-react";

function PublicFooter() {
    return (
        <div className="bg-[#f6f6f6]">
            <div className="mx-auto w-5xl rounded-tl-2xl rounded-tr-2xl bg-[#1c1c1c] px-10 pt-18 pb-8 text-white">
                <div className="grid grid-cols-12 gap-20">
                    <div className="col-span-4">
                        <Logo isWhite />
                        <p className="mt-3 text-sm">
                            Nền tảng xây dựng chatbot tự động, giúp bạn trả lời
                            tin nhắn, quản lý flow hội thoại và theo dõi hiệu
                            quả — tất cả trong một hệ thống đơn giản.
                        </p>
                    </div>
                    <Navbar />
                </div>
                <div className="mt-18 flex items-center justify-between">
                    <div className="text-sm">
                        © 2025 Botforge. All rights reserved.
                    </div>
                    <div className="flex items-center gap-4">
                        {[
                            { icon: <Instagram />, key: "ig" },
                            { icon: <Facebook />, key: "fb" },
                            { icon: <Github />, key: "gh" },
                        ].map(({ icon, key }) => (
                            <div
                                key={key}
                                className="cursor-pointer rounded-md bg-linear-to-b from-[#474747] to-[#1a1a1a] p-2 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-105 hover:shadow-[0_10px_20px_-6px_rgba(255,255,255,0.35)]"
                            >
                                {icon}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PublicFooter;
