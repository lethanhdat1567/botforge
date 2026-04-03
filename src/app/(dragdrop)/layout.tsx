"use client";

import DragdropSidebar from "@/layouts/dragdrop/DragdropSidebar/DragdropSidebar";
import { useTheme } from "next-themes";
import { useEffect } from "react";

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
        <div className="bg-background text-foreground flex min-h-svh w-full items-start">
            <DragdropSidebar />
            <div className="min-h-svh min-w-0 flex-1">{children}</div>
        </div>
    );
}

export default DragdropLayout;
