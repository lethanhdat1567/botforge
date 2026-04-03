"use client";

import { useEffect, useState } from "react";
import Logo from "@/components/Logo";
import Navbar from "@/layouts/public/PublicHeader/components/Navbar/Navbar";
import StartBtn from "@/layouts/public/PublicHeader/components/StartBtn/StartBtn";
import clsx from "clsx";
import { ToggleTheme } from "@/layouts/private/PrivateHeader/components/ToggleTheme/ToggleTheme";

function PublicHeader() {
    const [hidden, setHidden] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        requestAnimationFrame(() => {
            setMounted(true);
        });
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 80) {
                setHidden(true);
            } else {
                setHidden(false);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    return (
        <div
            className={clsx(
                "fixed top-10 left-1/2 z-50",
                "-translate-x-1/2",
                "overflow-anchor-none",
                "flex w-4xl items-center justify-between",
                "rounded-lg border border-border bg-muted/90",
                "px-8 py-1.5 backdrop-blur-md",
                "transition-all duration-500 ease-out",
                !mounted && "-translate-y-24 opacity-0",
                mounted &&
                    (hidden
                        ? "-translate-y-32 opacity-0"
                        : "translate-y-0 opacity-100 shadow-[0_12px_24px_-8px_rgba(0,0,0,0.2)] dark:shadow-[0_12px_24px_-8px_rgba(0,0,0,0.55)]"),
            )}
        >
            <Logo />
            <Navbar />
            <div className="item-center flex gap-2">
                <ToggleTheme />
                <StartBtn />
            </div>
        </div>
    );
}

export default PublicHeader;
