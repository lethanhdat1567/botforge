import axios, { AxiosRequestConfig, AxiosHeaders } from "axios";
import envConfig from "@/config/envConfig";
import { redirect } from "next/navigation";

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
            const accessToken = cookieStore.get("access_token")?.value;

            if (accessToken) {
                config.headers = {
                    ...config.headers,
                    Authorization: `Bearer ${accessToken}`,
                };
            }
        }

        // ------ Fetch Client To Server Check  ------
        if (config.isFetchClientToServerNext) {
            config.url = `${envConfig.BASE_URL}${config.url}`;
        }

        return config as any;
    },
    (error) => Promise.reject(error),
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.data?.data?.code === "UNAUTHORIZED") {
            if (typeof window !== "undefined") {
                window.location.href = "/logout";
            } else {
                redirect("/logout" as any);
            }
        }

        return Promise.reject(error);
    },
);

export default api;
