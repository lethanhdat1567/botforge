"use client";

import {
    Avatar as RootAvatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { resolveMediaSrc } from "@/lib/image";
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
                src={resolveMediaSrc(src) as string}
                alt={alt}
                onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = resolveMediaSrc(
                        null,
                    ) as string;
                }}
                className="object-cover"
            />
            <AvatarFallback>{fallback}</AvatarFallback>
        </RootAvatar>
    );
}

export default Avatar;
