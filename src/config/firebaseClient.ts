import { initializeApp, getApps, type FirebaseOptions } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import envConfig from "@/config/envConfig";

const firebaseConfig: FirebaseOptions = {
    apiKey: envConfig.FIREBASE_API_KEY,
    authDomain: envConfig.FIREBASE_AUTH_DOMAIN,
    projectId: envConfig.FIREBASE_PROJECT_ID,
    appId: envConfig.FIREBASE_APP_ID,
};

let auth: Auth | null = null;

export function getClientAuth(): Auth {
    if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
        throw new Error(
            "Thiếu biến môi trường Firebase (NEXT_PUBLIC_FIREBASE_API_KEY, NEXT_PUBLIC_FIREBASE_PROJECT_ID, …).",
        );
    }
    if (!auth) {
        const app = getApps().length ? getApps()[0]! : initializeApp(firebaseConfig);
        auth = getAuth(app);
    }
    return auth;
}
