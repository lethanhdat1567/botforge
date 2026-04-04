import { SignupForm } from "@/app/(auth)/register/RegisterForm";
import { images } from "@/assets/images";
import Logo from "@/components/Logo";
import Image from "next/image";

export default function SignupPage() {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex min-w-0 flex-col gap-4 p-6 md:p-10">
                <Logo />
                <div className="flex min-w-0 flex-1 items-center justify-center">
                    <div className="w-full min-w-0 max-w-md">
                        <SignupForm />
                    </div>
                </div>
            </div>
            <div className="bg-muted relative hidden min-h-0 lg:block">
                <Image
                    src={images.authBanner}
                    alt="Đăng ký"
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 50vw, 0"
                />
            </div>
        </div>
    );
}
