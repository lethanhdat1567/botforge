import PublicFooter from "@/layouts/public/PublicFooter/PublicFooter";
import PublicHeader from "@/layouts/public/PublicHeader/PublicHeader";
import { ReactLenis } from "lenis/react";

function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <ReactLenis root />
            <PublicHeader />
            {children}
            <PublicFooter />
        </div>
    );
}

export default PublicLayout;
