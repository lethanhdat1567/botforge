import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import PrivateHeader from "@/layouts/private/PrivateHeader/PrivateHeader";

function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider className="min-w-0">
            <AppSidebar />
            <SidebarInset className="h-dvh max-h-dvh min-h-0 min-w-0 overflow-hidden">
                <PrivateHeader />
                <Separator className="hidden shrink-0 md:block" />
                <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-x-hidden overflow-y-auto p-3 sm:p-4 md:p-6">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}

export default AdminLayout;
