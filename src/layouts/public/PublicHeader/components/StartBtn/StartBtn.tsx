"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { cn } from "@/lib/utils";

type StartBtnProps = {
    className?: string;
    buttonClassName?: string;
};

function StartBtn({ className, buttonClassName }: StartBtnProps) {
    const user = useAuthStore((state) => state.user);

    return (
        <Link href={"/login" as any} className={cn("inline-flex", className)}>
            <button
                type="button"
                className={cn(
                    "group/start-btn bg-foreground text-background flex cursor-pointer items-center gap-2 rounded-xl px-4 py-3 text-xs font-semibold shadow-[0_10px_20px_-6px_rgba(0,0,0,0.25)] transition-all duration-300 hover:bg-violet-800 hover:text-white hover:shadow-[0_18px_40px_-10px_rgba(109,40,217,0.55)] dark:shadow-[0_10px_20px_-6px_rgba(0,0,0,0.5)]",
                    buttonClassName,
                )}
            >
                {user ? "Trang quản lý" : "Khám phá ngay"}
                <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover/start-btn:translate-x-1"
                />
            </button>
        </Link>
    );
}

export default StartBtn;
