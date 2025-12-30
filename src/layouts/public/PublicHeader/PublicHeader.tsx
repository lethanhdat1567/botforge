import Logo from "@/components/Logo";
import Navbar from "@/layouts/public/PublicHeader/components/Navbar/Navbar";
import { Rocket } from "lucide-react";

function PublicHeader() {
    return (
        <header className="fixed z-40 flex h-(--header-h) w-screen items-center">
            <div className="app-container flex items-center justify-between">
                <Logo />
                <Navbar />
                <button className="group flex cursor-pointer items-center gap-2 rounded-full bg-(--primary-color) px-6 py-2.5 text-lg font-medium transition hover:opacity-70">
                    <Rocket
                        size={24}
                        className="transition group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                    Get Started
                </button>
            </div>
        </header>
    );
}

export default PublicHeader;
