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
        <div className="rounded-md border-2 border-border bg-card p-6 shadow-[0_12px_18px_-8px_rgba(0,0,0,0.12)] dark:shadow-[0_12px_18px_-8px_rgba(0,0,0,0.45)]">
            <span className="inline-block rounded-sm bg-foreground p-3 text-background">
                <Icon size={20} />
            </span>

            <h3 className="mt-2 text-lg font-medium">{title}</h3>

            <p className="mt-2 text-sm text-muted-foreground">{description}</p>

            <a className="mt-4 inline-block text-sm font-medium text-primary underline">
                {linkText}
            </a>
        </div>
    );
}

export default ContactInfoItem;
