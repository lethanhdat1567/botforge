"use client";

import { useEffect, useState } from "react";
import Logo from "@/components/Logo";
import Navbar, {
    PUBLIC_NAV_LINKS,
} from "@/layouts/public/PublicHeader/components/Navbar/Navbar";
import StartBtn from "@/layouts/public/PublicHeader/components/StartBtn/StartBtn";
import clsx from "clsx";
import { ToggleTheme } from "@/layouts/private/PrivateHeader/components/ToggleTheme/ToggleTheme";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function PublicHeader() {
    const pathname = usePathname();
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
                "fixed top-4 left-1/2 z-50 sm:top-10",
                "-translate-x-1/2",
                "overflow-anchor-none",
                "flex w-[calc(100vw-2rem)] max-w-4xl items-center justify-between gap-2 sm:gap-4",
                "rounded-lg border border-border bg-muted/90",
                "px-3 py-1.5 backdrop-blur-md sm:px-6 md:px-8",
                "transition-all duration-500 ease-out",
                !mounted && "-translate-y-24 opacity-0",
                mounted &&
                    (hidden
                        ? "-translate-y-32 opacity-0"
                        : "translate-y-0 opacity-100 shadow-[0_12px_24px_-8px_rgba(0,0,0,0.2)] dark:shadow-[0_12px_24px_-8px_rgba(0,0,0,0.55)]"),
            )}
        >
            <div className="min-w-0 shrink-0">
                <Logo />
            </div>
            <Navbar />
            <div className="flex shrink-0 items-center gap-1 sm:gap-2">
                <ToggleTheme />
                <StartBtn className="hidden md:inline-flex" />
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                            aria-label="Mở menu điều hướng"
                        >
                            <Menu className="size-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[min(100%,20rem)]">
                        <SheetHeader>
                            <SheetTitle className="sr-only">
                                Menu điều hướng
                            </SheetTitle>
                        </SheetHeader>
                        <nav className="flex flex-col gap-1 px-2 pt-4">
                            {PUBLIC_NAV_LINKS.map((item) => {
                                const isActive = pathname === item.link;
                                return (
                                    <SheetClose asChild key={item.title}>
                                        <Link
                                            href={item.link}
                                            className={cn(
                                                "rounded-lg border border-transparent px-4 py-3 text-base font-medium transition-all",
                                                "hover:border-border hover:bg-muted/80",
                                                isActive &&
                                                    "border-border bg-muted/60",
                                            )}
                                        >
                                            {item.title}
                                        </Link>
                                    </SheetClose>
                                );
                            })}
                            <div className="border-border mt-4 border-t pt-4">
                                <SheetClose asChild>
                                    <StartBtn
                                        className="w-full"
                                        buttonClassName="w-full justify-center py-3.5 text-sm"
                                    />
                                </SheetClose>
                            </div>
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    );
}

export default PublicHeader;
