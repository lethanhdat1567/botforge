import SingleHeader from "@/layouts/single/SingleHeader/SingleHeader";
import { ReactNode } from "react";

function SingleHeaderLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <SingleHeader />
            <div>{children}</div>
        </div>
    );
}

export default SingleHeaderLayout;
