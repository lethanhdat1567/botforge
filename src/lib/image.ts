// src/lib/media.ts
import { images } from "@/assets/images";
import envConfig from "@/config/envConfig";
import { StaticImageData } from "next/image";

function joinUrl(base: string, path: string) {
    return `${base.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;
}

export function resolveImageSrc(src?: string | null): string | StaticImageData {
    if (!src) return images.fallback;

    if (src.startsWith("http://") || src.startsWith("https://")) {
        return src;
    }

    if (src.startsWith("/uploads") || src.startsWith("uploads")) {
        return joinUrl(envConfig.BE_URL, src);
    }

    return images.fallback;
}
