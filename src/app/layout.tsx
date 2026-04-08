import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import SliceSession from "@/components/SliceSession/SliceSession";

const inter = Inter({
    subsets: ["latin", "vietnamese"],
    variable: "--font-inter",
    display: "swap",
});

export const metadata: Metadata = {
    title: "BotForge – Nền tảng Tạo Chatbot Miễn phí",
    description:
        "Xây dựng và quản lý kịch bản chatbot tự động dễ dàng với BotForge. Nền tảng miễn phí giúp tối ưu quy trình hội thoại và chăm sóc khách hàng.",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="vi" suppressHydrationWarning>
            <body className={`${inter.className} antialiased`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
                <Toaster />
                <SliceSession />
            </body>
        </html>
    );
}
