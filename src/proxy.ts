import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const authRoutes = [
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
    "/verify-email",
];
const userRoutes = ["/dashboard"];
const adminRoutes = ["/admin/dashboard"];

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const token = request.cookies.get("accessToken")?.value;
    const role = request.cookies.get("role")?.value;

    if (token) {
        if (authRoutes.some((route) => pathname.startsWith(route))) {
            return NextResponse.redirect(
                new URL(
                    role === "admin" ? "/admin/dashboard" : "/dashboard",
                    request.url,
                ),
            );
        }

        if (
            role === "user" &&
            adminRoutes.some((route) => pathname.startsWith(route))
        ) {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }

        if (
            role === "admin" &&
            userRoutes.some((route) => pathname.startsWith(route))
        ) {
            return NextResponse.redirect(
                new URL("/admin/dashboard", request.url),
            );
        }
    }

    if (!token) {
        const refreshToken = request.cookies.get("refreshToken")?.value;
        const isProtectedRoute =
            userRoutes.some((route) => pathname.startsWith(route)) ||
            adminRoutes.some((route) => pathname.startsWith(route));

        if (isProtectedRoute) {
            if (refreshToken) {
                const syncUrl = new URL("/auth-session-sync", request.url);
                syncUrl.searchParams.set("refreshToken", refreshToken);
                syncUrl.searchParams.set("redirectTo", pathname);
                return NextResponse.redirect(syncUrl);
            }

            return NextResponse.redirect(new URL("/login", request.url));
        }
    }
    return NextResponse.next();
}

export const config = {
    matcher: [
        "/login",
        "/register",
        "/forgot-password",
        "/reset-password",
        "/verify-email",
        "/dashboard",
        "/admin/dashboard",
    ],
};
