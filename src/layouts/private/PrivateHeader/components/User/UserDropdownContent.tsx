import Avatar from "@/components/Avatar";
import {
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { authService } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";
import { Bell, LogOut, UserIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function UserDropdownContent({
    align = "end",
    side = "bottom",
}: {
    align?: "start" | "end" | "center";
    side?: "top" | "bottom" | "left" | "right";
}) {
    const user = useAuthStore((state) => state.user);
    const clearAuth = useAuthStore((state) => state.clearAuth);
    const router = useRouter();

    async function handleLogout() {
        try {
            await authService.logoutFromNextClientToNextServer();
            toast.success("Bạn đã đăng xuất thành công");
        } catch (error) {
            console.log(error);
        } finally {
            clearAuth();
            router.push("/login");
        }
    }

    return (
        <DropdownMenuContent
            align={align}
            side={side}
            className="w-60 rounded-none"
        >
            <div className="flex items-center gap-2 p-1">
                <Avatar className="h-8 w-8" src={user?.avatar} />
                <div>
                    <h2 className="text-sm font-bold">{user?.displayName}</h2>
                    <h3 className="text-xs text-neutral-600">{user?.email}</h3>
                </div>
            </div>
            <DropdownMenuSeparator />
            <Link href={"/profile" as any}>
                <DropdownMenuItem>
                    <UserIcon /> Trang cá nhân
                </DropdownMenuItem>
            </Link>
            <DropdownMenuItem>
                <Bell /> Thông báo
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onClick={handleLogout}>
                <LogOut /> Logout
            </DropdownMenuItem>
        </DropdownMenuContent>
    );
}

export default UserDropdownContent;
