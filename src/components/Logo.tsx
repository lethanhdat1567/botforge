import Link from "next/link";

function Logo() {
    return (
        <Link href={{ pathname: "/" }} className="text-3xl font-bold">
            Bot<strong className="text-(--primary-color)">Forge</strong>
        </Link>
    );
}

export default Logo;
