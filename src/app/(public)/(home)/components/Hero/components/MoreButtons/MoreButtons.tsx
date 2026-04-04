import AnimatedContent from "@/components/AnimatedContent";
import Link from "next/link";

function MoreButtons() {
    return (
        <div className="mt-8 flex w-full max-w-sm flex-col items-stretch gap-3 px-4 sm:mt-10 sm:w-auto sm:max-w-none sm:flex-row sm:items-center sm:gap-4 sm:px-0">
            {/* Get Started */}
            <AnimatedContent direction="horizontal" reverse>
                <Link href="/login" className="block w-full sm:w-auto">
                    <button className="bg-foreground text-background w-full cursor-pointer rounded-xl px-6 py-3 text-sm font-semibold shadow-[0_10px_25px_-10px_rgba(0,0,0,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-violet-800 hover:text-white hover:shadow-[0_18px_45px_-12px_rgba(109,40,217,1)] active:translate-y-0 sm:w-auto dark:shadow-[0_10px_25px_-10px_rgba(0,0,0,0.5)]">
                        Bắt đầu ngay
                    </button>
                </Link>
            </AnimatedContent>

            {/* See Demo */}
            <AnimatedContent direction="horizontal">
                <Link href="/blogs" className="block w-full sm:w-auto">
                    <button className="border-foreground text-foreground w-full cursor-pointer rounded-xl border bg-transparent px-6 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-800 hover:bg-violet-800 hover:text-white hover:shadow-[0_14px_35px_-12px_rgba(109,40,217,0.9)] active:translate-y-0 sm:w-auto">
                        Cách thức hoạt động
                    </button>
                </Link>
            </AnimatedContent>
        </div>
    );
}

export default MoreButtons;
