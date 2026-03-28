import envConfig from "@/config/envConfig";
import { authCode } from "@/constants/auth";
import { getAuthToken, HttpError } from "@/http/helpers";
import { getOrCreateLiveChatAnonymousId } from "@/lib/live-chat-identity";
import { redirect } from "next/navigation";

const API_URL = envConfig.BE_URL;

type CustomOptions = RequestInit & {
    baseUrl?: string;
    params?: Record<string, string | number | boolean | undefined>;
};

export const request = async <T>(
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
    url: string,
    options?: CustomOptions,
): Promise<T> => {
    const base = options?.baseUrl ?? API_URL;
    const isFormData = options?.body instanceof FormData;

    const body = isFormData
        ? (options.body as FormData)
        : options?.body
          ? JSON.stringify(options.body)
          : undefined;

    let queryString = "";
    if (options?.params) {
        const cleanParams = Object.fromEntries(
            Object.entries(options.params).filter(
                ([, value]) => value !== undefined,
            ),
        ) as Record<string, string>;

        queryString = `?${new URLSearchParams(cleanParams).toString()}`;
    }

    const fullUrl = url.startsWith("/")
        ? `${base}${url}${queryString}`
        : `${base}/${url}${queryString}`;

    const headers = { ...options?.headers } as any;

    if (!isFormData) {
        headers["Content-Type"] = "application/json";
    }

    const token = await getAuthToken();

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    } else if (typeof window !== "undefined") {
        const anonymousId = getOrCreateLiveChatAnonymousId();
        if (anonymousId) {
            headers["X-Anonymous-Id"] = anonymousId;
        }
    }

    const res = await fetch(fullUrl, {
        ...options,
        method,
        body,
        headers: {
            ...headers,
            ...options?.headers,
        },
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));

        if (
            errorData.data.code === authCode.Unauthorized &&
            res.status === 401
        ) {
            if (typeof window !== "undefined") {
                window.location.href = "/auth-logout";
            } else {
                redirect("/auth-logout");
            }
        }
        throw new HttpError({
            status: res.status,
            payload: errorData,
        });
    }

    return res.json() as Promise<T>;
};

// Tạo các hàm helper tiện lợi
export const http = {
    get: <T>(url: string, options?: Omit<CustomOptions, "body">) =>
        request<T>("GET", url, options),
    post: <T>(url: string, body: any, options?: Omit<CustomOptions, "body">) =>
        request<T>("POST", url, { ...options, body }),
    put: <T>(url: string, body: any, options?: Omit<CustomOptions, "body">) =>
        request<T>("PUT", url, { ...options, body }),

    patch: <T>(url: string, body: any, options?: Omit<CustomOptions, "body">) =>
        request<T>("PATCH", url, { ...options, body }),
    delete: <T>(url: string, options?: Omit<CustomOptions, "body">) =>
        request<T>("DELETE", url, options),
};
