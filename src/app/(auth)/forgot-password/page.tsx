import { SendMailForm } from "@/app/(auth)/forgot-password/ForgotPasswordForm";

export default function OTPPage() {
    return (
        <div className="bg-background flex min-h-svh w-full min-w-0 flex-col items-center justify-center gap-6 px-4 py-6 sm:px-6 md:p-10">
            <div className="w-full min-w-0 max-w-sm">
                <SendMailForm />
            </div>
        </div>
    );
}
