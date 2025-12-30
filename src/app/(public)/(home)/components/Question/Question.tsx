import Tabs from "@/app/(public)/(home)/components/Question/components/Tabs/Tabs";
import { Mail } from "lucide-react";

function Question() {
    return (
        <div className="bg-[#0e0d0d] pt-20 pb-20">
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
        </div>
    );
}

export default Question;
