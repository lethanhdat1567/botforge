import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        formats: ["image/webp"],
        remotePatterns: [
            {
                protocol: "http",
                hostname: "localhost",
                port: "8000",
                pathname: "/uploads/**",
            },
            {
                protocol: "https",
                hostname: "i.pravatar.cc",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "images.unsplash.com",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "api.botforge.io.vn",
                pathname: "/uploads/**",
            },
        ],
        unoptimized: true,
    },
    reactStrictMode: false,
};

export default nextConfig;
