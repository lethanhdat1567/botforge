import { User } from "lucide-react";

function WhyChoiceUsItem() {
    return (
        <div className="rounded-lg border border-white p-8 shadow-2xl">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-sm bg-black text-white">
                <User size={24} />
            </span>
            <h3 className="mt-4 text-lg font-medium">
                Your Growth Command Center
            </h3>
            <p className="mt-2 text-sm text-neutral-700">
                Everything you need to scale faster without friction.
            </p>
        </div>
    );
}

export default WhyChoiceUsItem;
