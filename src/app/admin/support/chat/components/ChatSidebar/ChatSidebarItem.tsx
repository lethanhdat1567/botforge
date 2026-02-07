import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { timeAgo } from "@/lib/timer";
import { cn } from "@/lib/utils";

export type ChatSidebarItemProps = {
    active?: boolean;
    displayName: string;
    lastMessage: string;
    lastMessageAt: any;
    unreadCount: number;
    onClick?: (userId: string) => void;
    userId: string;
};

function ChatSidebarItem({
    active,
    displayName,
    lastMessage,
    lastMessageAt,
    unreadCount,
    onClick,
    userId,
}: ChatSidebarItemProps) {
    return (
        <div
            onClick={() => onClick?.(userId)}
            className={cn(
                "hover:bg-muted flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2",
                active && "bg-muted",
            )}
        >
            <Avatar>
                <AvatarFallback>{displayName[0]}</AvatarFallback>
            </Avatar>

            <div className="flex w-full flex-col gap-1">
                {/* Name + time */}
                <div className="flex items-center justify-between">
                    <p className="truncate text-sm font-medium">
                        {displayName}
                    </p>
                    <span className="text-muted-foreground text-xs">
                        {timeAgo(lastMessageAt)}
                    </span>
                </div>

                {/* Last message + unread */}
                <div className="flex items-center justify-between">
                    <p className="text-muted-foreground truncate text-sm">
                        {lastMessage}
                    </p>

                    {unreadCount > 0 && (
                        <span className="bg-primary text-primary-foreground flex h-6 w-6 items-center justify-center rounded-full text-xs">
                            {unreadCount}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ChatSidebarItem;
