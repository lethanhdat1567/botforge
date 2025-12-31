"use client";

import {
    Avatar as RootAvatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { resolveImageSrc } from "@/lib/image";
import { cn } from "@/lib/utils";

type AvatarProps = {
    src?: string | null;
    alt?: string;
    fallback?: string;
    className?: string;
};

function Avatar({
    src,
    alt = "avatar",
    fallback = "??",
    className,
}: AvatarProps) {
    return (
        <RootAvatar className={cn(className)}>
            <AvatarImage
                src={resolveImageSrc(src) as string}
                alt={alt}
                onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = resolveImageSrc(
                        null,
                    ) as string;
                }}
            />
            <AvatarFallback>{fallback}</AvatarFallback>
        </RootAvatar>
    );
}

export default Avatar;
