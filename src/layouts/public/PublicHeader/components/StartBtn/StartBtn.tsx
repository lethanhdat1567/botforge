import { ArrowRight } from "lucide-react";
import Link from "next/link";

function StartBtn() {
    return (
        <Link href={"/login" as any}>
            <button className="group/start-btn flex cursor-pointer items-center gap-2 rounded-xl bg-black px-4 py-3 text-xs font-semibold text-white shadow-[0_10px_20px_-6px_rgba(0,0,0,1)] transition-all duration-300 hover:bg-purple-800 hover:shadow-[0_18px_40px_-10px_rgba(0,0,0,1)]">
                Khám phá ngay
                <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover/start-btn:translate-x-1"
                />
            </button>
        </Link>
    );
}

export default StartBtn;
