"use client";

import { Button } from "@/components/ui/button";
import { authService } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";

function LogoutBtn() {
    const accessToken = useAuthStore((state) => state.accessToken);
    const logout = useAuthStore((state) => state.logout);

    async function handleLogout() {
        // Goi server
        try {
            await authService.logoutFromClientToServer(accessToken || "");
            toast.success("Bạn đã đăng xuất thành công");
        } catch (error) {
            console.log(error);
        } finally {
            logout();
        }
    }

    return <Button onClick={handleLogout}>Logout</Button>;
}

export default LogoutBtn;
