import { LoginForm } from "@/app/(auth)/login/LoginForm";
import { images } from "@/assets/images";
import Logo from "@/components/Logo";
import Image from "next/image";

export default function LoginPage() {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex min-w-0 flex-col gap-4 p-6 md:p-10">
                <Logo />
                <div className="flex min-w-0 flex-1 items-center justify-center">
                    <div className="w-full min-w-0 max-w-md">
                        <LoginForm />
                    </div>
                </div>
            </div>
            <div className="bg-muted relative hidden min-h-0 lg:block">
                <Image
                    src={images.authBanner}
                    alt="Login"
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 50vw, 0"
                />
            </div>
        </div>
    );
}
