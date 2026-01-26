"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

function BackBtn({ href }: { href?: string }) {
    const router = useRouter();

    const handleClick = () => {
        if (href) {
            router.push(href as any);
        } else {
            router.back();
        }
    };

    return (
        <Button
            variant="outline"
            className="rounded-none"
            onClick={handleClick}
        >
            <ChevronLeft />
        </Button>
    );
}

export default BackBtn;
