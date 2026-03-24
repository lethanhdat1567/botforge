import { AppSidebar } from "@/components/ui/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import PrivateHeader from "@/layouts/private/PrivateHeader/PrivateHeader";

function PrivateLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <PrivateHeader />
                <div className="p-4">{children}</div>
            </SidebarInset>
        </SidebarProvider>
    );
}

export default PrivateLayout;
