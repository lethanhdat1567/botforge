import axios, { AxiosRequestConfig, AxiosHeaders } from "axios";
import envConfig from "@/config/envConfig";

interface ApiRequestConfig extends AxiosRequestConfig {
    isFetchClientToServerNext?: boolean;
}

const api = axios.create({
    baseURL: envConfig.API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor
api.interceptors.request.use(
    async (config: ApiRequestConfig) => {
        config.headers = config.headers || ({} as AxiosHeaders);

        // ------ Client  ------
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("accessToken");
            if (token) {
                config.headers = {
                    ...config.headers,
                    Authorization: `Bearer ${token}`,
                };
            }
        }
        // ------ Server  ------
        else {
            const { cookies } = await import("next/headers");
            const cookieStore = await cookies();
            const accessToken = cookieStore.get("accessToken")?.value;

            if (accessToken) {
                config.headers = {
                    ...config.headers,
                    Authorization: `Bearer ${accessToken}`,
                };
            }
        }

        // ------ Fetch Client To Server Check  ------
        if (config.isFetchClientToServerNext) {
            config.url = envConfig.BASE_URL;
        }

        return config as any;
    },
    (error) => Promise.reject(error),
);

export default api;
