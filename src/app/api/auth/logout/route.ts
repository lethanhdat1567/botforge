import { authService } from "@/services/authService";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
    const cookieOptions = {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax" as const,
        maxAge: 0,
        expires: new Date(0),
    };

    const cookieNames = ["accessToken", "refreshToken", "role"];

    try {
        const cookiesStore = await cookies();
        const refreshToken = cookiesStore.get("refreshToken")?.value;

        // Nếu không có refreshToken, vẫn nên xóa sạch cookie ở trình duyệt cho an toàn
        if (!refreshToken) {
            const response = NextResponse.json(
                {
                    status: "error",
                    message: "No token found, but cleared cookies",
                },
                { status: 401 },
            );
            cookieNames.forEach((name) =>
                response.cookies.set(name, "", cookieOptions),
            );
            return response;
        }

        try {
            await authService.logout(refreshToken);
        } catch (backendError) {
            console.error(
                "Backend logout failed, but we will still clear browser cookies:",
                backendError,
            );
        }

        const response = NextResponse.json({
            status: "success",
            data: { message: "Logout successfully" },
        });

        cookieNames.forEach((name) =>
            response.cookies.set(name, "", cookieOptions),
        );

        return response;
    } catch (err) {
        const errorResponse = NextResponse.json(
            { status: "error", data: { message: String(err) } },
            { status: 500 },
        );

        cookieNames.forEach((name) =>
            errorResponse.cookies.set(name, "", cookieOptions),
        );
        return errorResponse;
    }
}
