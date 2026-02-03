import PublicHeader from "@/layouts/public/PublicHeader/PublicHeader";

function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <PublicHeader />
            {children}
        </div>
    );
}

export default PublicLayout;
