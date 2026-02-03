import Link from "next/link";

function Navbar() {
    const navData = [
        {
            title: "Home",
            link: "/",
        },
        {
            title: "About",
            link: "/about",
        },
        {
            title: "Guides",
            link: "/guides",
        },
        {
            title: "Contact",
            link: "/contact",
        },
    ];

    return (
        <nav>
            <ul className="flex items-center gap-2">
                {navData.map((item) => (
                    <li key={item.title}>
                        <Link
                            href={item.link as any}
                            className="rounded-lg border border-transparent px-4 py-1.5 text-[14px] font-medium transition-all duration-300 hover:border-white hover:hover:shadow-[0_10px_30px_-8px_rgba(0,0,0,0.6)]"
                        >
                            {item.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Navbar;
