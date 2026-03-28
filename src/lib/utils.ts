import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/** True when `pathname` is the route `href` or a nested segment under it. */
export function isNavPathActive(pathname: string, href: string) {
    if (!href || href === "#") return false;
    const norm = (p: string) =>
        p.length > 1 && p.endsWith("/") ? p.slice(0, -1) : p;
    const path = norm(pathname);
    const base = norm(href);
    if (path === base) return true;
    return path.startsWith(`${base}/`);
}
