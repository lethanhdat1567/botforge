"use client";

import Avatar from "@/components/Avatar";
import {
    DropdownMenu,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserDropdownContent from "@/layouts/private/PrivateHeader/components/User/UserDropdownContent";
import { resolveMediaSrc } from "@/lib/image";
import { authService, User as UserType } from "@/services/authService";
import { useEffect, useState } from "react";

function User() {
    const [user, setUser] = useState<UserType | null>(null);

    const fetchUser = async () => {
        const me = await authService.me();
        setUser(me);
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchUser();
    }, []);

    if (!user) return;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer">
                <Avatar
                    className="h-8 w-8"
                    src={resolveMediaSrc(user?.avatar || "") as string}
                />
            </DropdownMenuTrigger>
            <UserDropdownContent />
        </DropdownMenu>
    );
}

export default User;
