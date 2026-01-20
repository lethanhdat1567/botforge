import { AppSidebar } from "@/components/ui/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import PrivateHeader from "@/layouts/private/PrivateHeader/PrivateHeader";
import { NuqsAdapter } from "nuqs/adapters/next/app";

function PrivateLayout({ children }: { children: React.ReactNode }) {
    return (
        <NuqsAdapter>
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <PrivateHeader />
                    <div className="p-4">{children}</div>
                </SidebarInset>
            </SidebarProvider>
        </NuqsAdapter>
    );
}

export default PrivateLayout;
