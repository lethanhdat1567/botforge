import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface ReplyProps {
    author: string;
    content: string;
}

export const ReplyItem = ({ author, content }: ReplyProps) => {
    return (
        <div className="flex items-start gap-3 pt-2">
            <Avatar className="border-border h-6 w-6 border">
                <AvatarFallback className="text-[10px] font-bold">
                    AD
                </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-0.5 text-left">
                <span className="text-foreground text-[12px] font-bold">
                    {author}
                </span>
                <p className="text-muted-foreground text-[13px] leading-snug">
                    {content}
                </p>
            </div>
        </div>
    );
};
