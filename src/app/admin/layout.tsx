import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AdminHeader from "@/layouts/admin/AdminHeader";

function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <AdminHeader />
                <Separator />
                <div className="p-4">{children}</div>
            </SidebarInset>
        </SidebarProvider>
    );
}

export default AdminLayout;
