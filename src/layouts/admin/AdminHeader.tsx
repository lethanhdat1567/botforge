import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Notification from "@/layouts/private/PrivateHeader/components/Notification/Notification";
import { ToggleTheme } from "@/layouts/private/PrivateHeader/components/ToggleTheme/ToggleTheme";
import User from "@/layouts/private/PrivateHeader/components/User/User";

function AdminHeader() {
    return (
        <header className="flex h-14 shrink-0 items-center gap-2">
            <div className="flex w-full items-center justify-between gap-2 px-4">
                <div className="flex items-center">
                    <SidebarTrigger className="-ml-1" />
                </div>
                <div className="flex items-center gap-4">
                    <ToggleTheme />
                    <Notification />
                    <Separator
                        orientation="vertical"
                        className="mr-2 data-[orientation=vertical]:h-4"
                    />
                    <User />
                </div>
            </div>
        </header>
    );
}

export default AdminHeader;
