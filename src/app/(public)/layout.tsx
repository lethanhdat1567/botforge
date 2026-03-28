import PublicFooter from "@/layouts/public/PublicFooter/PublicFooter";
import PublicHeader from "@/layouts/public/PublicHeader/PublicHeader";
import { PublicLiveChatWidget } from "@/layouts/public/PublicLiveChat/PublicLiveChatWidget";
import { ReactLenis } from "lenis/react";

function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <ReactLenis root />
            <PublicHeader />
            {children}
            <PublicFooter />
            <PublicLiveChatWidget />
        </div>
    );
}

export default PublicLayout;
