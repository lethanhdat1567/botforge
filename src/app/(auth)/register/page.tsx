import { SignupForm } from "@/app/(auth)/register/RegisterForm";
import { images } from "@/assets/images";
import Logo from "@/components/Logo";
import Image from "next/image";

export default function SignupPage() {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <Logo />
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-md">
                        <SignupForm />
                    </div>
                </div>
            </div>
            <div className="bg-muted relative hidden lg:block">
                <Image src={images.authBanner} alt="Login" fill />
            </div>
        </div>
    );
}
