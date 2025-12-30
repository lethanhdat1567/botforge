import styles from "./Navbar.module.css";
import { navItems } from "@/layouts/public/PublicHeader/components/Navbar/data";
import { cn } from "@/lib/utils";
import Link from "next/link";

function Navbar() {
    return (
        <nav>
            <ul className="text-md flex items-center">
                {navItems.map((item) => (
                    <li key={item.name}>
                        <Link
                            href={{ pathname: item.href }}
                            className={cn(
                                styles.item,
                                "px-4 py-1 font-medium text-neutral-300 transition duration-300 hover:text-(--primary-color)",
                            )}
                        >
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Navbar;
