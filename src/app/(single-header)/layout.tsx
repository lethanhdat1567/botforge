import SingleHeader from "@/layouts/single/SingleHeader/SingleHeader";
import { ReactNode } from "react";

function SingleHeaderLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-svh w-full min-w-0 flex-col bg-background text-foreground">
            <SingleHeader />
            <div className="w-full min-w-0 flex-1">{children}</div>
        </div>
    );
}

export default SingleHeaderLayout;
