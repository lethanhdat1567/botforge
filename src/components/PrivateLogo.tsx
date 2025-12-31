import { Command } from "lucide-react";
import Link from "next/link";

function PrivateLogo() {
    return (
        <Link
            href={{ pathname: "/dashboard" }}
            className="flex items-center gap-2"
        >
            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <Command className="size-4" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">BotForge</span>
                <span className="truncate text-xs">ChatbotAI</span>
            </div>
        </Link>
    );
}

export default PrivateLogo;
