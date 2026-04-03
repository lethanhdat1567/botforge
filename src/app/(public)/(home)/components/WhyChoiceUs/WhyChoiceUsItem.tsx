import AnimatedContent from "@/components/AnimatedContent";
import { LucideIcon } from "lucide-react";

interface Props {
    icon: LucideIcon;
    title: string;
    description: string;
    index: number;
}

function WhyChoiceUsItem({ icon: Icon, title, description, index }: Props) {
    return (
        <AnimatedContent
            delay={index * 0.2}
            className="rounded-lg border border-border bg-background p-8 shadow-2xl"
        >
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-sm bg-foreground text-background">
                <Icon size={24} />
            </span>
            <h3 className="mt-4 text-lg font-medium">{title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        </AnimatedContent>
    );
}

export default WhyChoiceUsItem;
