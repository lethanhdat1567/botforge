const envConfig = {
    API_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api",
    BE_URL: process.env.NEXT_PUBLIC_BE_URL || "http://localhost:8000",
    BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
    NEXT_PUBLIC_GOOGLE_CLIENT_ID:
        process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
    NEXT_PUBLIC_FACEBOOK_APP_ID: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || "",
};

export default envConfig;
