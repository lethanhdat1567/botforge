import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { accessToken, role, accessTokenExpiresIn } = body;

        if (!accessToken || !role) {
            return NextResponse.json(
                { error: "accessToken or role not found" },
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
            maxAge: accessTokenExpiresIn,
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

        return response;
    } catch (err) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 },
        );
    }
}
