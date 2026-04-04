"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const PUBLIC_NAV_LINKS = [
    { title: "Trang chủ", link: "/" },
    { title: "Giới thiệu", link: "/about" },
    { title: "Hướng dẫn", link: "/blogs" },
    { title: "Liên hệ", link: "/contact" },
] as const;

function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="hidden min-w-0 md:block">
            <ul className="flex items-center gap-1 lg:gap-2">
                {PUBLIC_NAV_LINKS.map((item) => {
                    const isActive = pathname === item.link;

                    return (
                        <li key={item.title} className="shrink-0">
                            <Link
                                href={item.link}
                                className={cn(
                                    "rounded-lg border border-transparent px-2 py-1.5 text-[13px] font-medium transition-all duration-300 lg:px-4 lg:text-[14px]",
                                    "hover:border-border hover:shadow-[0_10px_30px_-8px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_10px_30px_-8px_rgba(0,0,0,0.45)]",
                                    isActive &&
                                        "border-border shadow-[0_10px_30px_-8px_rgba(0,0,0,0.12)] dark:shadow-[0_10px_30px_-8px_rgba(0,0,0,0.45)]",
                                )}
                            >
                                {item.title}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}

export default Navbar;
