"use client";

import Avatar from "@/components/Avatar";
import {
    DropdownMenu,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserDropdownContent from "@/layouts/private/PrivateHeader/components/User/UserDropdownContent";
import { useAuthStore } from "@/store/authStore";

function User() {
    const user = useAuthStore((state) => state.user);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer">
                <Avatar className="h-8 w-8" src={user?.avatar} />
            </DropdownMenuTrigger>
            <UserDropdownContent />
        </DropdownMenu>
    );
}

export default User;
