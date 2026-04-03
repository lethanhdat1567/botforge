import { AppSidebar } from "@/components/ui/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import PrivateHeader from "@/layouts/private/PrivateHeader/PrivateHeader";

function PrivateLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="min-h-0">
                <PrivateHeader />
                <div className="min-h-0 flex-1 overflow-auto p-4">{children}</div>
            </SidebarInset>
        </SidebarProvider>
    );
}

export default PrivateLayout;
