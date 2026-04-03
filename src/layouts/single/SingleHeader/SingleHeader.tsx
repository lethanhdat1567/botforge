"use client";

import Logo from "@/components/Logo";
import Navbar from "@/layouts/public/PublicHeader/components/Navbar/Navbar";
import StartBtn from "@/layouts/public/PublicHeader/components/StartBtn/StartBtn";
import { ToggleTheme } from "@/layouts/private/PrivateHeader/components/ToggleTheme/ToggleTheme";

function SingleHeader() {
    return (
        <header className="border-border bg-background/80 sticky top-0 z-50 w-full border-b backdrop-blur-md">
            <div className="mx-auto flex h-16 w-5xl items-center justify-between px-4">
                <Logo />
                <Navbar />
                <div className="item-center flex gap-2">
                    <ToggleTheme />
                    <StartBtn />
                </div>
            </div>
        </header>
    );
}

export default SingleHeader;
