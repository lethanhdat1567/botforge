import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import PrivateHeader from "@/layouts/private/PrivateHeader/PrivateHeader";

function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="h-dvh max-h-dvh min-h-0 overflow-hidden">
                <PrivateHeader />
                <Separator className="shrink-0" />
                <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden p-4">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}

export default AdminLayout;
