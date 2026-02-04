import { LucideIcon } from "lucide-react";

interface ContactInfoItemProps {
    icon: LucideIcon;
    title: string;
    description: string;
    linkText: string;
}

function ContactInfoItem({
    icon: Icon,
    title,
    description,
    linkText,
}: ContactInfoItemProps) {
    return (
        <div className="rounded-md border-2 border-white bg-neutral-50 p-6 shadow-[0_12px_18px_-8px_rgba(0,0,0,0.35)]">
            <span className="inline-block rounded-sm bg-black p-3 text-white">
                <Icon size={20} />
            </span>

            <h3 className="mt-2 text-lg font-medium">{title}</h3>

            <p className="mt-2 text-sm text-neutral-800">{description}</p>

            <a className="mt-4 inline-block text-sm font-medium underline">
                {linkText}
            </a>
        </div>
    );
}

export default ContactInfoItem;
