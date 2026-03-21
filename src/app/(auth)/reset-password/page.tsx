"use client";

import PasswordChecking from "@/app/(auth)/reset-password/components/PasswordChecking";
import { ResetPasswordForm } from "@/app/(auth)/reset-password/components/ResetPasswordForm";
import { useState } from "react";

export default function ResetPassword() {
    const [isValidToken, setIsValidToken] = useState(false);
    const [userId, setUserId] = useState("");

    return (
        <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="w-full max-w-sm">
                {isValidToken && userId ? (
                    <ResetPasswordForm userId={userId} />
                ) : (
                    <PasswordChecking
                        setIsValidToken={setIsValidToken}
                        setUserId={setUserId}
                    />
                )}
            </div>
        </div>
    );
}
