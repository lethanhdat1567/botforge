"use client";

import Logo from "@/components/Logo";
import Navbar, {
    PUBLIC_NAV_LINKS,
} from "@/layouts/public/PublicHeader/components/Navbar/Navbar";
import StartBtn from "@/layouts/public/PublicHeader/components/StartBtn/StartBtn";
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

function SingleHeader() {
    const pathname = usePathname();

    return (
        <header className="border-border bg-background/80 sticky top-0 z-50 w-full min-w-0 border-b backdrop-blur-md">
            <div className="mx-auto flex h-16 w-full max-w-5xl min-w-0 items-center justify-between gap-2 px-4 sm:gap-4 sm:px-6">
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
        </header>
    );
}

export default SingleHeader;
