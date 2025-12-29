import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "@/components/theme-provider";

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
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <NextIntlClientProvider>{children}</NextIntlClientProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
