const envConfig = {
    API_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api",
    BE_URL: process.env.NEXT_PUBLIC_BE_URL || "http://localhost:8000",
    BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
    FACEBOOK_APP_ID: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || "",
    FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
    FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
    FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
    FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
};

export default envConfig;
