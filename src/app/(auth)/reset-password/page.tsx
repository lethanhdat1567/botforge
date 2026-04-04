"use client";

import PasswordChecking from "@/app/(auth)/reset-password/components/PasswordChecking";
import { ResetPasswordForm } from "@/app/(auth)/reset-password/components/ResetPasswordForm";
import { useState } from "react";

export default function ResetPassword() {
    const [isValidToken, setIsValidToken] = useState(false);
    const [userId, setUserId] = useState("");

    return (
        <div className="bg-background flex min-h-svh w-full min-w-0 flex-col items-center justify-center gap-6 px-4 py-6 sm:px-6 md:p-10">
            <div className="w-full min-w-0 max-w-sm">
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
