import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Notification from "@/layouts/private/PrivateHeader/components/Notification/Notification";
import { ToggleTheme } from "@/layouts/private/PrivateHeader/components/ToggleTheme/ToggleTheme";
import User from "@/layouts/private/PrivateHeader/components/User/User";

function PrivateHeader() {
    return (
        <header className="bg-background flex h-14 min-w-0 shrink-0 items-center justify-between gap-2 border-b border-border px-3 sm:h-16 sm:px-4 md:px-6">
            <div className="flex min-w-0 items-center gap-1 sm:gap-2">
                <SidebarTrigger className="-ml-1 shrink-0" />
                <Separator
                    orientation="vertical"
                    className="hidden data-[orientation=vertical]:h-4 sm:block"
                />
            </div>
            <div className="flex shrink-0 items-center gap-1 sm:gap-2 md:gap-4">
                <ToggleTheme />
                <Separator
                    orientation="vertical"
                    className="hidden data-[orientation=vertical]:h-4 md:block"
                />
                <Notification />
                <User />
            </div>
        </header>
    );
}

export default PrivateHeader;
