import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Notification from "@/layouts/private/PrivateHeader/components/Notification/Notification";
import { ToggleTheme } from "@/layouts/private/PrivateHeader/components/ToggleTheme/ToggleTheme";
import User from "@/layouts/private/PrivateHeader/components/User/User";

function PrivateHeader() {
    return (
        <header className="bg-background flex h-16 shrink-0 items-center justify-between border-b border-border px-6">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Separator
                    orientation="vertical"
                    className="mr-2 data-[orientation=vertical]:h-4"
                />
            </div>
                <div className="flex items-center gap-4">
                    <ToggleTheme />
                    <Separator
                        orientation="vertical"
                        className="mr-2 data-[orientation=vertical]:h-4"
                    />
                    <Notification />
                    <User />
                </div>
        </header>
    );
}

export default PrivateHeader;
