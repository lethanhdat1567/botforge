import AnimatedContent from "@/components/AnimatedContent";

function MoreButtons() {
    return (
        <div className="mt-10 flex items-center gap-4">
            {/* Get Started */}
            <AnimatedContent direction="horizontal" reverse>
                <button className="cursor-pointer rounded-xl bg-foreground px-6 py-3 text-sm font-semibold text-background shadow-[0_10px_25px_-10px_rgba(0,0,0,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-violet-800 hover:text-white hover:shadow-[0_18px_45px_-12px_rgba(109,40,217,1)] active:translate-y-0 dark:shadow-[0_10px_25px_-10px_rgba(0,0,0,0.5)]">
                    Tạo chatbot miễn phí
                </button>
            </AnimatedContent>

            {/* See Demo */}
            <AnimatedContent direction="horizontal">
                <button className="cursor-pointer rounded-xl border border-foreground bg-transparent px-6 py-3 text-sm font-semibold text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-800 hover:bg-violet-800 hover:text-white hover:shadow-[0_14px_35px_-12px_rgba(109,40,217,0.9)] active:translate-y-0">
                    Xem hướng dẫn
                </button>
            </AnimatedContent>
        </div>
    );
}

export default MoreButtons;
