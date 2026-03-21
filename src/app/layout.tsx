import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { GoogleOAuthProvider } from "@react-oauth/google";
import envConfig from "@/config/envConfig";
import SliceSession from "@/components/SliceSession/SliceSession";

const inter = Inter({
    subsets: ["latin", "vietnamese"],
    variable: "--font-inter",
    display: "swap",
});

export const metadata: Metadata = {
    title: "BotForge – Build Chatbots Faster",
    description:
        "BotForge is a free platform to build, manage, and share chatbot flows easily. Create templates, automate conversations, and scale your chatbot faster.",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="vi" suppressHydrationWarning>
            <body className={`${inter.className} antialiased`}>
                <GoogleOAuthProvider clientId={envConfig.GOOGLE_CLIENT_ID}>
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
                </GoogleOAuthProvider>
            </body>
        </html>
    );
}
