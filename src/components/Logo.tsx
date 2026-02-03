import { Lectern } from "lucide-react";
import Link from "next/link";

function Logo() {
    return (
        <Link href="/">
            <div className="flex items-center gap-2 text-lg font-bold">
                <Lectern size={20} /> Botforge
            </div>
        </Link>
    );
}

export default Logo;
