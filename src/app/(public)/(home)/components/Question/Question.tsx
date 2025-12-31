import Tabs from "@/app/(public)/(home)/components/Question/components/Tabs/Tabs";
import { Mail } from "lucide-react";

function Question() {
    return (
        <div className="relative bg-[#0e0d0d] py-30">
            <div className="app-container grid grid-cols-2">
                <div className="max-w-xl">
                    <h2 className="mb-6 text-6xl leading-16 font-medium">
                        Frequently Asked Questions
                    </h2>
                    <p className="mb-8 text-2xl text-neutral-400">
                        Have more questions?
                    </p>
                    <button className="text-md flex cursor-pointer items-center gap-4 rounded-full border bg-(--primary-color) px-6 py-3 font-medium transition hover:opacity-70">
                        <Mail /> Contact us
                    </button>
                </div>
                <div>
                    <Tabs />
                </div>
            </div>

            {/* Layer hồng chủ đạo */}
            <div className="pointer-events-none absolute -top-20 -left-40 z-0 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-[#d50274]/30 via-[#ff66a1]/20 to-[#ffffff]/10 blur-[150px]" />

            {/* Layer highlight phụ */}
            <div className="pointer-events-none absolute -right-40 -bottom-20 z-0 h-[400px] w-[400px] rounded-full bg-gradient-to-tl from-[#ff66a1]/20 via-[#d50274]/10 to-[#ffffff]/5 blur-[120px]" />
        </div>
    );
}

export default Question;
