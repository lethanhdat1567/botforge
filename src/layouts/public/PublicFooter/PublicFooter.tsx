import Logo from "@/components/Logo";
import Navbar from "@/layouts/public/PublicFooter/components/Navbar/Navbar";
import { Facebook, Github, Instagram } from "lucide-react";

function PublicFooter() {
    return (
        <div className="bg-muted">
            <div className="mx-auto w-5xl rounded-tl-2xl rounded-tr-2xl bg-neutral-950 px-10 pt-18 pb-8 text-neutral-50 dark:bg-card dark:text-card-foreground">
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
                                className="cursor-pointer rounded-md bg-linear-to-b from-background/20 to-background/5 p-2 ring-1 ring-inset ring-background/15 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-105 hover:shadow-[0_10px_20px_-6px_rgba(255,255,255,0.2)] dark:from-foreground/15 dark:to-foreground/5 dark:ring-foreground/10 dark:hover:shadow-[0_10px_20px_-6px_rgba(255,255,255,0.12)]"
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
