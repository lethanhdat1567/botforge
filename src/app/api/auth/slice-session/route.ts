// app/api/auth/logout/route.ts
import { authService } from "@/services/authService";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { refreshToken } = body;

        if (!refreshToken) {
            return NextResponse.json(
                { error: "Refresh token not found" },
                { status: 400 },
            );
        }

        const res = await authService.refreshToken(refreshToken);
        const { access_token, expired_in, refresh_token } = res.data.token;

        const response = NextResponse.json({
            message: "Refresh token successfully",
            access_token,
            expired_in,
            refresh_token,
        });

        response.cookies.set({
            name: "access_token",
            value: access_token,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: expired_in / 1000,
        });

        return response;
    } catch (err: any) {
        // Lấy thông tin code và message từ err.response nếu có
        const code = err.response?.data?.data?.code || "UNKNOWN_ERROR";
        const message = err.response?.data?.message || "Refresh token failed";

        if (code === "INVALID_TOKEN" || code === "TOKEN_EXPIRED") {
            const response = NextResponse.json(
                { message, code }, // gửi code cho FE
                { status: 401 },
            );

            response.cookies.delete("access_token");
            response.cookies.delete("role");

            return response;
        }

        return NextResponse.json({ message, code }, { status: 500 });
    }
}
