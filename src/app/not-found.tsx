import Link from "next/link";
import type { Metadata } from "next";
import { Home } from "lucide-react";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
    title: "Không tìm thấy trang | BotForge",
    description: "Trang bạn tìm không tồn tại hoặc đã được chuyển đi.",
};

export default function NotFound() {
    return (
        <div className="bg-background text-foreground flex min-h-svh flex-col items-center justify-center px-6">
            <div className="flex max-w-md flex-col items-center text-center">
                <p className="text-primary font-mono text-7xl font-bold tracking-tight tabular-nums sm:text-8xl">
                    404
                </p>
                <h1 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
                    Không tìm thấy trang
                </h1>
                <p className="text-muted-foreground mt-3 text-sm leading-relaxed sm:text-base">
                    Đường dẫn bạn truy cập không tồn tại hoặc đã bị di chuyển. Hãy kiểm tra lại URL hoặc quay về
                    trang chủ.
                </p>
                <Button asChild className="mt-8" size="lg">
                    <Link href="/">
                        <Home className="size-4" aria-hidden />
                        Về trang chủ
                    </Link>
                </Button>
            </div>
        </div>
    );
}
