import { MessageCircle } from "lucide-react";

function Heading({ color, name }: { color: string; name: string }) {
    return (
        <div className="flex items-center gap-1">
            <span
                className={`bg-background flex h-6 w-6 shrink-0 items-center justify-center rounded-sm border border-${color}`}
            >
                <MessageCircle
                    size={14}
                    className={`text-${color} bg-${color} `}
                />
            </span>
            <input
                className="focus:border-foreground flex-1 border border-transparent outline-none"
                value={name}
            />
        </div>
    );
}

export default Heading;
