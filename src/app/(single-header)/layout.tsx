import SingleHeader from "@/layouts/single/SingleHeader/SingleHeader";
import { ReactNode } from "react";

function SingleHeaderLayout({ children }: { children: ReactNode }) {
    return (
        <div>
            <SingleHeader />
            <div>{children}</div>
        </div>
    );
}

export default SingleHeaderLayout;
