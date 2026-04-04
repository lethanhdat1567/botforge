import { AppSidebar } from "@/components/ui/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import PrivateHeader from "@/layouts/private/PrivateHeader/PrivateHeader";

function PrivateLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider className="min-w-0">
            <AppSidebar />
            <SidebarInset className="min-h-0 min-w-0 overflow-hidden">
                <PrivateHeader />
                <div className="min-h-0 min-w-0 flex-1 overflow-auto p-3 sm:p-4 md:p-6">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}

export default PrivateLayout;
