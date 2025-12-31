import { ChevronsUpDown } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import UserDropdownContent from "@/layouts/private/PrivateHeader/components/User/UserDropdownContent";
import Avatar from "@/components/Avatar";
import { useAuthStore } from "@/store/authStore";
import { useHydrated } from "@/hooks/use-hydrated";

export function NavUser() {
    const user = useAuthStore((state) => state.user);
    const hydrated = useHydrated();

    if (!hydrated) return null;

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <Avatar
                                className="h-8 w-8 rounded-lg"
                                src={user?.avatar}
                            />

                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-medium">
                                    {user?.displayName}
                                </span>
                                <span className="truncate text-xs">
                                    {user?.email}
                                </span>
                            </div>
                            <ChevronsUpDown className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <UserDropdownContent align="start" />
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
