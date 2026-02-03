"use client";

import { useEffect, useState } from "react";
import Logo from "@/components/Logo";
import Navbar from "@/layouts/public/PublicHeader/components/Navbar/Navbar";
import StartBtn from "@/layouts/public/PublicHeader/components/StartBtn/StartBtn";
import clsx from "clsx";

function PublicHeader() {
    const [hidden, setHidden] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 80) {
                // scroll xuống
                setHidden(true);
            } else {
                // scroll lên
                setHidden(false);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    return (
        <div
            className={clsx(
                "fixed top-10 left-1/2 z-50 flex w-4xl -translate-x-1/2 items-center justify-between rounded-lg border border-white bg-[#f6f6f6f0] px-8 py-1.5 backdrop-blur-md",
                "transition-all duration-500 ease-out",
                hidden
                    ? "-translate-y-32 opacity-0"
                    : "translate-y-0 opacity-100 shadow-[0_12px_24px_-8px_rgba(0,0,0,0.25)]",
            )}
        >
            <Logo />
            <Navbar />
            <StartBtn />
        </div>
    );
}

export default PublicHeader;
