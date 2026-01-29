import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock } from "lucide-react";

function NotificationItem() {
    return (
        <div className="flex items-start gap-4 border-b p-2">
            <Avatar className="h-10 w-10">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
                <p className="text-sm">
                    sadasd sad asdas das asdsa das asdasd sadasd sad asdas das
                    asdsa das asdasd sadasd sad asdas das asdsa das asdasdsadasd
                    sad asdas das asdsa das asdasd
                </p>
                <span className="text-muted-foreground flex items-center gap-1 text-xs">
                    <Clock size={12} /> 3 days ago
                </span>
            </div>
        </div>
    );
}

export default NotificationItem;
