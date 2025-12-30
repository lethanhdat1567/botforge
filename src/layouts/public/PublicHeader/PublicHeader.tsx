"use client";
import { useEffect, useState, useRef } from "react";
import Logo from "@/components/Logo";
import Navbar from "@/layouts/public/PublicHeader/components/Navbar/Navbar";
import { Rocket } from "lucide-react";
import Link from "next/link";

function PublicHeader() {
    const [showHeader, setShowHeader] = useState(true);
    const [isHero, setIsHero] = useState(true);
    const prevScroll = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY;

            // Hide/show header
            if (currentScroll > prevScroll.current && currentScroll > 100) {
                setShowHeader(false);
            } else {
                setShowHeader(true);
            }

            // Kiểm tra hero section
            setIsHero(currentScroll < window.innerHeight); // hero full screen

            prevScroll.current = currentScroll;
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 z-40 flex h-(--header-h) w-screen items-center transition-transform duration-500 ${
                showHeader ? "translate-y-0" : "-translate-y-full"
            } ${
                isHero ? "bg-transparent" : "bg-black backdrop-blur-sm" // background khi ra khỏi hero
            }`}
        >
            <div className="app-container flex items-center justify-between">
                <Logo />
                <Navbar />
                <Link href={{ pathname: "/login" }}>
                    <button className="group flex cursor-pointer items-center gap-2 rounded-full bg-(--primary-color) px-6 py-2.5 text-lg font-medium transition hover:opacity-70">
                        <Rocket
                            size={24}
                            className="transition group-hover:translate-x-1 group-hover:-translate-y-1"
                        />
                        Get Started
                    </button>
                </Link>
            </div>
        </header>
    );
}

export default PublicHeader;
