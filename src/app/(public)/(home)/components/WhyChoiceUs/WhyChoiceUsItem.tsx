import { LucideIcon } from "lucide-react";

interface Props {
    icon: LucideIcon;
    title: string;
    description: string;
}

function WhyChoiceUsItem({ icon: Icon, title, description }: Props) {
    return (
        <div className="rounded-lg border border-white p-8 shadow-2xl">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-sm bg-black text-white">
                <Icon size={24} />
            </span>
            <h3 className="mt-4 text-lg font-medium">{title}</h3>
            <p className="mt-2 text-sm text-neutral-700">{description}</p>
        </div>
    );
}

export default WhyChoiceUsItem;
