// app/api/auth/logout/route.ts
import { authService } from "@/services/authService";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { accessToken } = body;

        if (accessToken) {
            await authService.logout(accessToken);
        }

        const response = NextResponse.json({
            message: "Logged out successfully",
        });

        // Sử dụng delete() để xóa cookie
        // Next.js sẽ tự động set expire date về quá khứ cho bạn
        response.cookies.delete("access_token");
        response.cookies.delete("role");

        return response;
    } catch (err) {
        return NextResponse.json({ error: "Logout failed" }, { status: 500 });
    }
}
