import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { accessToken, refreshToken, role, accessTokenExpiresIn } = body;

        if (!accessToken || !role || !accessTokenExpiresIn || !refreshToken) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 },
            );
        }

        const response = NextResponse.json({
            message: "Token and Role set successfully",
        });

        // Cấu hình cookie chung
        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            sameSite: "lax" as const,
        };

        response.cookies.set({
            name: "accessToken",
            value: accessToken,
            ...cookieOptions,
        });

        response.cookies.set({
            name: "role",
            value: role,
            ...cookieOptions,
        });

        response.cookies.set({
            name: "refreshToken",
            value: refreshToken,
            ...cookieOptions,
            maxAge: 60 * 60 * 24 * 30,
        });

        return response;
    } catch (err) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 },
        );
    }
}
