import { Rocket } from "lucide-react";

function CTA() {
    return (
        <div className="bg-[#0e0d0d] pt-20 pb-20">
            <div className="app-container text-center">
                <div className="mx-auto inline-flex max-w-5xl flex-col items-center justify-center rounded-4xl border-2 p-20">
                    <h2 className="mb-10 text-center text-5xl font-semibold">
                        Ready to find your next job role?
                    </h2>
                    <p className="mb-10 max-w-xl text-center text-xl text-neutral-400">
                        Join thousands of professionals who have found their
                        dream job with Jobhub. Get started today.
                    </p>
                    <button className="group flex cursor-pointer items-center gap-2 rounded-full bg-(--primary-color) px-6 py-3 text-lg transition hover:opacity-70">
                        <Rocket
                            size={20}
                            className="transition group-hover:translate-x-1 group-hover:-translate-y-1"
                        />
                        Bắt đầu miễn phí
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CTA;
