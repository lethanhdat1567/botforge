import ProblemItem from "@/app/(public)/(home)/components/Problem/ProblemItem";

function Problem() {
    return (
        <div className="mx-auto flex w-5xl flex-col items-center pt-30">
            <h1 className="w-xl text-center text-5xl font-medium">
                Why Founders Waste Time Scaling
            </h1>
            <p className="mt-4 w-md text-center">
                Built for founders who want clarity, focus, and speed without
                juggling 5 different tools.
            </p>

            {/* List */}
            <div className="mt-8 grid grid-cols-3 gap-4">
                <ProblemItem />
                <ProblemItem />
                <ProblemItem />
            </div>
            {/* Footer */}
            <div className="mt-10 w-full rounded-lg border border-white bg-neutral-100 py-6 text-center text-sm shadow-2xl">
                With Nexuma, you forget about tool chaos, wasted hours, and
                decision paralysis
            </div>
        </div>
    );
}

export default Problem;
