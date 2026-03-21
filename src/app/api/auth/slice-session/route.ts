import { authService } from "@/services/authService";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { refreshToken } = body;

        if (!refreshToken) {
            return NextResponse.json(
                {
                    status: "error",
                    data: {
                        message: "Refresh token is required",
                    },
                },
                { status: 404 },
            );
        }

        const res = await authService.refreshToken({ refreshToken });

        const { accessToken, accessTokenExpiresIn } = res;

        const response = NextResponse.json({
            status: "success",
            data: {
                accessToken,
                accessTokenExpiresIn,
            },
        });

        response.cookies.set({
            name: "accessToken",
            value: accessToken,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: accessTokenExpiresIn,
        });

        return response;
    } catch (err: any) {
        return NextResponse.json(
            {
                status: "error",
                data: {
                    message: String(err),
                },
            },
            { status: 500 },
        );
    }
}
