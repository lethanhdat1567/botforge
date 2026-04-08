"use client";

import DragdropSidebar from "@/layouts/dragdrop/DragdropSidebar/DragdropSidebar";
import { useTheme } from "next-themes";
import { Suspense, useEffect } from "react";

export const dynamic = "force-dynamic";

function DragdropLayout({ children }: { children: React.ReactNode }) {
    const { setTheme } = useTheme();

    useEffect(() => {
        const previous = localStorage.getItem("theme");
        setTheme("light");
        return () => {
            if (
                previous === "light" ||
                previous === "dark" ||
                previous === "system"
            ) {
                setTheme(previous);
            } else {
                setTheme("system");
            }
        };
    }, [setTheme]);

    return (
        <div className="bg-background text-foreground flex min-h-svh w-full min-w-0 items-stretch">
            <Suspense fallback={null}>
                <DragdropSidebar />
            </Suspense>
            <div className="flex min-h-svh min-w-0 flex-1 flex-col overflow-hidden">
                {children}
            </div>
        </div>
    );
}

export default DragdropLayout;
