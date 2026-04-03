import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Navbar() {
    const pathname = usePathname();

    const navData = [
        {
            title: "Trang chủ",
            link: "/",
        },
        {
            title: "Giới thiệu",
            link: "/about",
        },
        {
            title: "Hướng dẫn",
            link: "/blogs",
        },
        {
            title: "Liên hệ",
            link: "/contact",
        },
    ];

    return (
        <nav>
            <ul className="flex items-center gap-2">
                {navData.map((item) => {
                    const isActive = pathname === item.link;

                    return (
                        <li key={item.title}>
                            <Link
                                href={item.link}
                                className={cn(
                                    "rounded-lg border border-transparent px-4 py-1.5 text-[14px] font-medium transition-all duration-300",
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
