import PublicFooter from "@/layouts/public/PublicFooter/PublicFooter";
import PublicHeader from "@/layouts/public/PublicHeader/PublicHeader";

function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="text-white">
            <PublicHeader />
            {children}
            <PublicFooter />
        </div>
    );
}

export default PublicLayout;
