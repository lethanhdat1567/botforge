"use client";

import Logo from "@/components/Logo";
import Navbar from "@/layouts/public/PublicHeader/components/Navbar/Navbar";
import StartBtn from "@/layouts/public/PublicHeader/components/StartBtn/StartBtn";

function SingleHeader() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/80 backdrop-blur-md">
            <div className="mx-auto flex h-16 w-5xl items-center justify-between px-4">
                <Logo />
                <Navbar />
                <StartBtn />
            </div>
        </header>
    );
}

export default SingleHeader;
