import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const authRoutes = [
    "/login",
    "/register",
    "/forgot-password",
    "/check-reset-token",
    "/reset-password",
];
const userRoutes = ["/dashboard"];
const adminRoutes = ["/admin/dashboard"];

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // 1. Lấy Token và Role từ Cookie (Thay đổi tên cookie tương ứng với dự án của bạn)
    const token = request.cookies.get("access_token")?.value;
    const role = request.cookies.get("role")?.value;

    // --- TRƯỜNG HỢP ĐÃ CÓ TOKEN ---
    if (token) {
        // Nếu vào các trang auth (login, register...) -> Về trang chủ tương ứng của từng Role
        if (authRoutes.some((route) => pathname.startsWith(route))) {
            return NextResponse.redirect(
                new URL(
                    role === "admin" ? "/admin/dashboard" : "/dashboard",
                    request.url,
                ),
            );
        }

        // Nếu Role là 'user' mà cố vào trang 'admin' -> Về /dashboard
        if (
            role === "user" &&
            adminRoutes.some((route) => pathname.startsWith(route))
        ) {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }

        // Nếu Role là 'admin' mà cố vào trang 'user' -> Về /admin/dashboard
        // (Lưu ý: Nếu bạn muốn admin vẫn xem được trang user thì xóa đoạn check này)
        if (
            role === "admin" &&
            userRoutes.some((route) => pathname.startsWith(route))
        ) {
            return NextResponse.redirect(
                new URL("/admin/dashboard", request.url),
            );
        }
    }

    // --- TRƯỜNG HỢP CHƯA CÓ TOKEN ---
    if (!token) {
        // Nếu cố vào trang User hoặc trang Admin -> Bắt quay về /login
        const isProtectedRoute =
            userRoutes.some((route) => pathname.startsWith(route)) ||
            adminRoutes.some((route) => pathname.startsWith(route));

        if (isProtectedRoute) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

    return NextResponse.next();
}

// Cấu hình Matcher để middleware chỉ chạy qua các route cần thiết
export const config = {
    matcher: [
        "/login",
        "/register",
        "/forgot-password",
        "/check-reset-token",
        "/reset-password",
        "/dashboard/:path*",
        "/admin/:path*",
    ],
};
